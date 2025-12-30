// Core type definitions for the e-commerce platform

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in cents
  priceEur?: number; // in cents (EUR)
  currency: string;
  images: string[]; // Array of image URLs
  videos?: string[]; // Array of video URLs
  category: 'roses' | 'mixed' | 'special' | 'seasonal';
  inStock: boolean;
  featured?: boolean;
  metadata?: {
    roses_count?: number;
    color?: string;
    occasion?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface CustomerInfo {
  email: string;
  name: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentIntentId?: string;
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  created: number;
}
