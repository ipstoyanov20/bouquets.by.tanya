'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EcontData {
  id: string;
  name: string;
  face?: string;
  phone: string;
  'e-mail': string;
  city_name: string;
  post_code: string;
  office_code?: string;
  address?: string;
  shipping_price_cod: string | number;
  shipping_price: string | number;
  shipping_price_currency: string;
  shipment_error?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'econt'>('econt'); // Default to Econt as priority
  const [econtData, setEcontData] = useState<EcontData | null>(null);

  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      if (paymentMethod === 'stripe') {
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

        if (data.url) {
          window.location.href = data.url;
          return;
        } else {
          throw new Error('No checkout URL received');
        }
      } else {
        // Econt checkout logic
        if (!econtData) {
          throw new Error('Моля, изберете адрес за доставка чрез формата на Еконт');
        }

        const response = await fetch('/api/econt/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart.items.map(item => ({
              name: item.product.name,
              SKU: item.product.id,
              count: item.quantity,
              totalPrice: (item.product.price * item.quantity / 100),
              totalWeight: item.quantity, // 1kg per item fallback
            })),
            customerInfo: {
              id: econtData.id,
              name: econtData.name,
              face: econtData.face,
              phone: econtData.phone,
              email: econtData['e-mail'],
              cityName: econtData.city_name,
              postCode: econtData.post_code,
              address: econtData.address,
              officeCode: econtData.office_code,
            },
            order_total: (cart.total / 100) * 1.95583, // EUR to BGN
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Неуспешна поръчка с Еконт');
        }

        router.push(`/success?order_id=${data.id}${data.waybillNumber ? `&waybill_number=${data.waybillNumber}` : ''}`);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  // Listen for Econt iframe messages
  if (typeof window !== 'undefined') {
    const handleEcontMessage = (event: MessageEvent) => {
      const data = event.data as EcontData;
      if (data && data.id) {
        setEcontData(data);
        if (data.shipment_error && data.shipment_error !== '') {
          setError('Грешка при изчисляване на доставката: ' + data.shipment_error);
        }
      }
    };
    window.addEventListener('message', handleEcontMessage);
  }

  const econtCalcUrl = process.env.NEXT_PUBLIC_ECONT_SHIPPMENT_CALC_URL;
  const econtShopId = process.env.NEXT_PUBLIC_ECONT_SHOP_ID || '5080473';
  const orderTotalBgn = (cart.total / 100) * 1.95583;
  const totalWeight = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const iframeUrl = `${econtCalcUrl}?id_shop=${econtShopId}&order_total=${orderTotalBgn.toFixed(2)}&order_currency=BGN&order_weight=${totalWeight}`;

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Завършване на поръчката</h1>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Обобщение на поръчката</h2>
          
          <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs sm:text-sm gap-2">
                <span className="text-gray-600 truncate flex-1 min-w-0">
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium whitespace-nowrap">
                  {formatPrice(item.product.price * item.quantity, item.product.currency)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-2 sm:pt-3 space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Междинна сума:</span>
              <span className="font-medium">{formatPrice(cart.subtotal, 'EUR')}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-600">ДДС (20%):</span>
              <span className="font-medium">{formatPrice(cart.tax, 'EUR')}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold">
              <span>Общо:</span>
              <span className="text-rose-600">{formatPrice(cart.total, 'EUR')}</span>
            </div>
          </div>
        </div>

        {/* Selection of Payment Method */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Начин на плащане</h2>
          <div className="space-y-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'econt' ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}
              onClick={() => setPaymentMethod('econt')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'econt' ? 'border-rose-500' : 'border-gray-300'}`}>
                    {paymentMethod === 'econt' && <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Наложен платеж (с Еконт)</span>
                    <p className="text-xs text-gray-500">Плащане при получаване на куриера</p>
                  </div>
                </div>
                <img src="/econt-logo.png" alt="Econt" className="h-8" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>

              {paymentMethod === 'econt' && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-medium mb-2">Изберете адрес за доставка:</p>
                  <div className="w-full bg-gray-100 rounded overflow-hidden" style={{ minHeight: '500px' }}>
                    <iframe 
                      src={iframeUrl}
                      className="w-full border-0" 
                      style={{ height: '600px' }}
                      title="Econt Delivery"
                    />
                  </div>
                  {econtData && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded text-sm text-green-800">
                      <strong>Избран адрес:</strong> {econtData.address || econtData.office_code}, {econtData.city_name}
                      <br />
                      <strong>Доставка:</strong> {econtData.shipping_price_cod} {econtData.shipping_price_currency}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}
              onClick={() => setPaymentMethod('stripe')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-rose-500' : 'border-gray-300'}`}>
                    {paymentMethod === 'stripe' && <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">С карта (Stripe)</span>
                    <p className="text-xs text-gray-500">Сигурно плащане с кредитна или дебитна карта</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <img src="https://js.stripe.com/v3/fingerprinted/img/visa-7ad57358.svg" alt="Visa" className="h-4" />
                  <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d88444a.svg" alt="Mastercard" className="h-4" />
                </div>
              </div>
              
              {paymentMethod === 'stripe' && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm text-gray-600">
                    Ще бъдете пренасочени към защитена страница на Stripe за завършване на плащането.
                  </p>
                </div>
              )}
            </div>
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
