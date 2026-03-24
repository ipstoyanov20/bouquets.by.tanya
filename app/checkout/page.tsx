'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Loader2, Truck, CreditCard, ChevronRight, Wallet } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = useState<'econt' | 'stripe'>('econt');
  const [econtData, setEcontData] = useState<EcontData | null>(null);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);

  if (cart.items.length === 0) {
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
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
              image: item.product.images?.[0],
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
              totalWeight: item.quantity,
            })),
            customerInfo: {
              id: econtData.id,
              name: econtData.name,
              face: econtData.face,
              phone: econtData.phone,
              email: econtData['e-mail'] || (econtData as any).email || '',
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
  useEffect(() => {
    const handleEcontMessage = (event: MessageEvent) => {
      const data = event.data as EcontData;
      if (data && data.id) {
        setEcontData(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
        if (data.shipment_error && data.shipment_error !== '') {
          setError(prev => prev === 'Грешка при изчисляване на доставката: ' + data.shipment_error ? prev : 'Грешка при изчисляване на доставката: ' + data.shipment_error);
        } else {
          setError(prev => prev === '' ? prev : '');
        }
      }
    };
    window.addEventListener('message', handleEcontMessage);
    return () => window.removeEventListener('message', handleEcontMessage);
  }, []);

  const econtCalcUrl = process.env.NEXT_PUBLIC_ECONT_SHIPPMENT_CALC_URL;
  const econtShopId = process.env.NEXT_PUBLIC_ECONT_SHOP_ID || '5080473';
  const orderTotalBgn = (cart.total / 100) * 1.95583;
  const totalWeight = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const iframeUrl = `${econtCalcUrl}?id_shop=${econtShopId}&order_total=${orderTotalBgn.toFixed(2)}&order_currency=BGN&order_weight=${totalWeight}`;

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Завършване на поръчката</h1>
          <p className="text-slate-500">Моля, прегледайте поръчката си и изберете метод на плащане</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 space-y-8">
            
            {/* Payment Methods Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 p-2 rounded-lg text-white">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Начин на плащане</h2>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 space-y-6">
                {/* 1. Econt (Cash on Delivery) - Priority #1 */}
                <div 
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'econt' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'}`}
                  onClick={() => setPaymentMethod('econt')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'econt' ? 'border-blue-600' : 'border-slate-300'}`}>
                        {paymentMethod === 'econt' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-lg">Наложен платеж (с Еконт)</h3>
                          <img src="/econt-logo.png" alt="Econt" className="h-5 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          Плащане в брой или с карта при получаване от куриера.
                        </p>
                      </div>
                    </div>
                    <Truck className={`w-6 h-6 ${paymentMethod === 'econt' ? 'text-blue-600' : 'text-slate-300'}`} />
                  </div>

                  {paymentMethod === 'econt' && (
                    <div className="mt-6 space-y-4 animate-in fade-in duration-300">
                      <label className="block text-sm font-semibold text-slate-700">Изберете офис или адрес за доставка:</label>
                      <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-inner" style={{ minHeight: '650px' }}>
                        <iframe 
                          src={iframeUrl}
                          className="w-full border-0" 
                          style={{ height: '650px' }}
                          title="Econt Delivery"
                        />
                      </div>
                      
                      {econtData && (
                        <div className="mt-4 p-5 bg-blue-100/50 border border-blue-200 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="bg-blue-600 p-1.5 rounded-full text-white mt-0.5">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                          <div className="text-sm text-blue-900">
                            <p className="font-bold mb-1">Избран адрес за доставка:</p>
                            <p className="opacity-90">{econtData.address || econtData.office_code}, {econtData.city_name}</p>
                            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-2">
                               <span>Доставка: {econtData.shipping_price_cod} {econtData.shipping_price_currency}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Stripe (Card) - Under Econt */}
                <div 
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-red-600 bg-red-50/30' : 'border-slate-100'}`}
                  onClick={() => setPaymentMethod('stripe')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-red-600' : 'border-slate-300'}`}>
                        {paymentMethod === 'stripe' && <div className="w-3 h-3 rounded-full bg-red-600" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">С карта (Stripe)</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Сигурно онлайн плащане с Вашата дебитна или кредитна карта.
                        </p>
                      </div>
                    </div>
                    <CreditCard className={`w-6 h-6 ${paymentMethod === 'stripe' ? 'text-red-600' : 'text-slate-300'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                  <div className="bg-slate-900 p-2 rounded-lg text-white">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Обобщение на поръчката</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-4 mb-8">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-medium">
                          {item.product.name}
                        </span>
                        <span className="text-slate-500 text-xs">Количество: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Междинна сума:</span>
                    <span className="font-medium text-slate-900">{formatPrice(cart.subtotal, 'EUR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ДДС (20%):</span>
                    <span className="font-medium text-slate-900">{formatPrice(cart.tax, 'EUR')}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2" />
                  <div className="flex justify-between text-xl font-extrabold">
                    <span className="text-slate-900">Общо:</span>
                    <span className="text-red-600">{formatPrice(cart.total, 'EUR')}</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 animate-in shake duration-500">
                <div className="bg-amber-500 text-white p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-amber-900 font-medium text-sm">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full h-16 text-lg font-bold rounded-2xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  paymentMethod === 'stripe' ? 'Продължи към плащане' : 'Завърши поръчката'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
