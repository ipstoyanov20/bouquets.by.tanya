// Utility functions for the application

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price in BGN
export function formatPrice(amountInCents: number, currency: string = 'BGN'): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount);
}

// Calculate tax (configurable, default 20% VAT)
export function calculateTax(subtotal: number, taxRate: number = 0.20): number {
  return Math.round(subtotal * taxRate);
}

// Generate order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone (Bulgarian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+359|0)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Safe JSON parsing
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}
