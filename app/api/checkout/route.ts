import { NextRequest, NextResponse } from 'next/server';
import { stripe, APP_URL } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validations';
import { getProductById } from '@/lib/products';
import { ZodError } from 'zod';

// POST /api/checkout - Create Stripe checkout session
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);

    // Validate all products exist and are in stock
    const lineItems = [];
    for (const item of validatedData.items) {
      const product = getProductById(item.productId);
      
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 400 }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `Product "${product.name}" is out of stock` },
          { status: 400 }
        );
      }

      // Create Stripe line item
      lineItems.push({
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: {
            name: product.name,
            description: product.description,
            images: product.images.map(img => `${APP_URL}${img}`),
            metadata: {
              product_id: product.id,
              ...product.metadata,
            },
          },
          unit_amount: product.price, // Price in cents
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/cart?canceled=true`,
      customer_email: validatedData.customerEmail,
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['BG'], // Bulgaria only, expand as needed
      },
      automatic_tax: {
        enabled: false, // We calculate tax manually
      },
      metadata: {
        order_source: 'web',
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    // Return session URL to redirect user to Stripe Checkout
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Checkout error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
