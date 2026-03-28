import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/mail';

const ECONT_API_URL = process.env.ECONT_API_URL || 'https://ee.econt.com/services/Shipments/LabelService.createLabel.json';
const ECONT_AUTH = process.env.ECONT_PRIVATE_KEY || 'Basic aWFzcC1kZXY6MUFzcC1kZXY=';


interface OrderItem {
  name: string;
  SKU: string;
  count: number;
  totalPrice: number;
  totalWeight: number;
}

interface CustomerInfo {
  id: string;
  name: string;
  face?: string;
  phone: string;
  email: string;
  cityName: string;
  postCode: string;
  officeCode?: string;
  address?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerInfo, order_total } = body;

    // Create unique order number for tracking
    const orderNumber = `TANQ-${Date.now()}`;

    // Calculate total weight
    const totalWeight = items.reduce((acc: number, item: OrderItem) => acc + (item.totalWeight || 1), 0);
    const totalCount = items.reduce((acc: number, item: OrderItem) => acc + item.count, 0);

    // Map the payload to Econt createLabel structure
    const econtPayload = {
      label: {
        senderClient: {
          id: process.env.NEXT_PUBLIC_ECONT_SHOP_ID || "8663661",
          name: "Bouquets By Tanq",
          phones: ["+359886611719"]
        },
        senderAddress: {
          city: {
            country: { code3: "BGR" },
            name: "София",
            postCode: "1715"
          },
          street: "ул. Д-р Атанас Москов",
          num: "7"
        },
        receiverClient: {
          name: customerInfo.name,
          phones: [customerInfo.phone],
          email: customerInfo.email
        },
        receiverAddress: {
          city: {
            country: { code3: "BGR" },
            name: customerInfo.cityName,
            postCode: customerInfo.postCode
          },
          // Only provide street if it's NOT an office delivery
          ...(!customerInfo.officeCode ? {
            street: customerInfo.address || "",
          } : {})
        },
        // Move officeCode and other receiver fields to top level of label
        ...(customerInfo.officeCode ? {
          receiverOfficeCode: customerInfo.officeCode
        } : {}),
        packCount: totalCount,
        shipmentType: "PACK",
        weight: totalWeight,
        shipmentDescription: `Поръчка #${orderNumber}: ` + items.map((i: OrderItem) => i.name).join(', '),
        orderNumber: orderNumber,
        sendDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        services: {
          cd: order_total.toFixed(2), // Cash on Delivery amount
          cd_currency: "BGN",
          sms_notification: 1 // Enable SMS for receiver
        },
        // Standard options for flowers: Review before paying
        payAfterAccept: 1,
        // The receiver (customer) pays for the shipping
        paymentReceiverMethod: "cash",
      },
      mode: "create"
    };

    console.log('Sending CreateLabel request to:', ECONT_API_URL);
    console.log('Payload:', JSON.stringify(econtPayload, null, 2));

    const response = await fetch(ECONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ECONT_AUTH,
      },
      body: JSON.stringify(econtPayload),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    const responseText = await response.text();
    
    try {
      if (contentType && contentType.includes('application/json')) {
        data = JSON.parse(responseText);
      } else {
        console.error('Econt API returned non-JSON response:', responseText.substring(0, 500));
        return NextResponse.json(
          { 
            error: 'Econt сървърът върна неочакван отговор (HTML). Моля, проверете настройките си.',
            details: responseText.substring(0, 200)
          },
          { status: 500 }
        );
      }
    } catch (parseError) {
      console.error('Error parsing Econt response:', parseError);
      return NextResponse.json(
        { error: 'Грешка при обработка на отговора от Еконт', details: responseText.substring(0, 200) },
        { status: 500 }
      );
    }

    if (!response.ok || data.error) {
      console.error('Econt API Error:', data);
      return NextResponse.json(
        { 
          error: 'Грешка при създаване на товарителница в Еконт', 
          details: data.error || data 
        },
        { status: response.status === 200 ? 400 : response.status }
      );
    }

    // Success response from Econt
    const waybillNumber = data.label?.shipmentNumber || data.shipmentNumber;

    // Send order confirmation email
    let emailSent = false;
    try {
      const emailResult = await sendOrderConfirmationEmail({
        orderId: orderNumber,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        total: order_total,
        items: items,
        waybillNumber: waybillNumber,
        address: `${customerInfo.address || customerInfo.officeCode || ""}, ${customerInfo.cityName}`,
      });
      emailSent = emailResult.success;
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr);
    }

    return NextResponse.json({
      success: true,
      id: orderNumber, 
      waybillNumber,
      emailSent,
      econtResponse: data,
    });

  } catch (error) {
    console.error('Econt route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
