import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderConfirmationEmail } from '@/lib/mail';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    console.log('Payment checkout session completed:', session.id);

    // Get order details from metadata or line items
    // For now, let's assume we have what we need to send the email
    // In a real app, you'd save the order to a database here
    
    try {
      const emailResult = await sendOrderConfirmationEmail({
        orderId: `STRIPE-${session.id.slice(-8)}`,
        customerName: session.customer_details?.name || 'Customer',
        customerEmail: session.customer_details?.email || '',
        total: session.amount_total / 100,
        items: [], // You'd fetch items from session.listLineItems
        address: session.shipping_details?.address?.line1 || 'Shipping Address',
      });
      if (!emailResult.success) {
        console.error('Resend failed to send Stripe confirmation email:', emailResult.error);
      }
    } catch (emailErr) {
      console.error('Failed to send Stripe confirmation email:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
