'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Завършване на поръчката</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Обобщение на поръчката</h2>
          
          <div className="space-y-3 mb-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity, item.product.currency)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Междинна сума:</span>
              <span className="font-medium">{formatPrice(cart.subtotal, 'BGN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ДДС (20%):</span>
              <span className="font-medium">{formatPrice(cart.tax, 'BGN')}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Общо:</span>
              <span className="text-rose-600">{formatPrice(cart.total, 'BGN')}</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Информация за плащане</h2>
          <p className="text-gray-600 mb-4">
            Ще бъдете пренасочени към защитена страница на Stripe за завършване на плащането.
            Приемаме всички основни кредитни и дебитни карти, както и Apple Pay и Google Pay.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Сигурно плащане чрез Stripe</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          size="lg"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Зареждане...
            </>
          ) : (
            'Продължи към плащане'
          )}
        </Button>
      </div>
    </div>
  );
}
