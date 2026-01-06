// Stripe configuration and utilities
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Webhook secret for signature verification
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Application URLs
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// Currency settings
export const DEFAULT_CURRENCY = 'eur';

// Tax rate (20% VAT for Bulgaria)
export const TAX_RATE = 0.20;
