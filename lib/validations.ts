import { z } from 'zod';

// Checkout session validation schema
export const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().positive('Quantity must be positive'),
    })
  ).min(1, 'Cart must contain at least one item'),
  customerEmail: z.string().email('Invalid email address').optional(),
});

// Customer info validation schema
export const customerInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(9, 'Phone number must be at least 9 digits'),
  address: z.object({
    line1: z.string().min(5, 'Address is required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    postal_code: z.string().min(4, 'Postal code is required'),
    country: z.string().length(2, 'Country code must be 2 characters'),
  }),
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
