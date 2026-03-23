import { NextRequest, NextResponse } from 'next/server';

const ECONT_API_URL = 'https://demo.econt.com/ee/services/ShippingService.createLabel.json';
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
    const orderNumber = `TANYA-${Date.now()}`;

    // Calculate total weight
    const totalWeight = items.reduce((acc: number, item: OrderItem) => acc + (item.totalWeight || 1), 0);
    const totalCount = items.reduce((acc: number, item: OrderItem) => acc + item.count, 0);

    // Map the payload to Econt createLabel structure
    const econtPayload = {
      label: {
        senderClient: {
          name: "Bouquets by Tanya",
          phones: ["+359886611719"]
        },
        senderAddress: {
          city: {
            country: { code3: "BGR" },
            name: "Русе",
            postCode: "7000"
          },
          street: "Алея Младост",
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
        paymentReceiverMethod: "cash", // Receiver pays the shipping cost
      },
      mode: "create"
    };

    console.log('Sending CreateLabel to Econt:', JSON.stringify(econtPayload, null, 2));

    const response = await fetch(ECONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ECONT_AUTH,
      },
      body: JSON.stringify(econtPayload),
    });

    const data = await response.json();

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
    // The waybill number is usually in label.shipmentNumber or similar depending on version
    return NextResponse.json({
      success: true,
      id: orderNumber, 
      waybillNumber: data.label?.shipmentNumber || data.shipmentNumber,
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
