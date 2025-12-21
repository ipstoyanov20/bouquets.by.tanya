import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { Order } from '@/lib/types';
import { generateOrderId } from '@/lib/utils';

// Disable body parsing, need raw body for signature verification
export const runtime = 'nodejs';

// POST /api/webhooks/stripe - Handle Stripe webhook events
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('No stripe-signature header found');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('PaymentIntent failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id);

  try {
    // Retrieve session with line items
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    // Extract order data
    const lineItems = fullSession.line_items?.data || [];
    const items = lineItems.map(item => {
      const product = item.price?.product as Stripe.Product;
      return {
        product: {
          id: product.metadata?.product_id || '',
          name: item.description || product.name,
          slug: '',
          description: '',
          price: item.price?.unit_amount || 0,
          currency: item.price?.currency || 'bgn',
          images: product.images || [],
          category: 'roses' as const,
          inStock: true,
        },
        quantity: item.quantity || 1,
      };
    });

    // Create order object
    const order: Order = {
      id: generateOrderId(),
      orderId: generateOrderId(),
      customer: {
        email: session.customer_details?.email || '',
        name: session.customer_details?.name || '',
        phone: session.customer_details?.phone || '',
        address: {
          line1: session.customer_details?.address?.line1 || '',
          line2: session.customer_details?.address?.line2 || '',
          city: session.customer_details?.address?.city || '',
          postal_code: session.customer_details?.address?.postal_code || '',
          country: session.customer_details?.address?.country || 'BG',
        },
      },
      items,
      subtotal: session.amount_subtotal || 0,
      tax: session.amount_total && session.amount_subtotal ? session.amount_total - session.amount_subtotal : 0,
      total: session.amount_total || 0,
      currency: session.currency || 'bgn',
      status: 'paid',
      paymentIntentId: session.payment_intent as string,
      stripeSessionId: session.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save order to file system (for production, use a database)
    await saveOrder(order);

    console.log('Order saved successfully:', order.orderId);

    // TODO: Send confirmation email to customer
    // TODO: Notify admin about new order

  } catch (error) {
    console.error('Error handling checkout session:', error);
    throw error;
  }
}

// Save order to file system
// In production, replace this with database storage
async function saveOrder(order: Order) {
  try {
    const ordersDir = join(process.cwd(), 'data', 'orders');
    
    // Ensure directory exists
    await mkdir(ordersDir, { recursive: true });

    // Save order as JSON file
    const orderPath = join(ordersDir, `${order.orderId}.json`);
    await writeFile(orderPath, JSON.stringify(order, null, 2), 'utf-8');

    console.log(`Order saved to: ${orderPath}`);
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
}
