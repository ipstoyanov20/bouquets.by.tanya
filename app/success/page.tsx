'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Loader2, ArrowLeft, Package, ShoppingBag } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const orderId = searchParams.get('order_id');
  const sessionId = searchParams.get('session_id');
  const waybillNumber = searchParams.get('waybill_number');

  useEffect(() => {
    if (orderId || sessionId) {
      // Clear cart after successful order confirmation
      clearCart();
      setLoading(false);
    } else {
      // No ID, redirect to home
      router.push('/');
    }
  }, [orderId, sessionId, clearCart, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12 text-center overflow-hidden relative">
          {/* Confetti-like decoration or backdrop */}
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
          
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-8 border-4 border-white shadow-sm ring-8 ring-green-50/50">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Поръчката е приета!</h1>
          
          <p className="text-slate-600 mb-10 text-lg max-w-md mx-auto leading-relaxed">
            Благодарим Ви за поръчката! Ще получите потвърждение на имейла си скоро.
            Екипът ни ще подготви Вашите цветя с много внимание.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 mb-10 border border-slate-100 flex flex-col gap-6 text-left">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                <ShoppingBag className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Номер на поръчка</p>
                <p className="font-mono text-xl font-bold text-slate-900 truncate">{orderId || sessionId}</p>
              </div>
            </div>
            
            {waybillNumber && (
              <div className="flex items-start gap-4 border-t border-slate-200 pt-6">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                  <Package className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Товарителница (Еконт)</p>
                  <p className="font-bold text-lg text-red-700">{waybillNumber}</p>
                  <p className="text-xs text-slate-500 mt-1 italic">Използвайте този номер за проследяване през сайта на Еконт.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 h-14 rounded-xl bg-red-600 hover:bg-red-700 shadow-md transition-all active:scale-95"
              onClick={() => router.push('/products')}
            >
              Продължи пазаруването
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 h-14 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 bg-white"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Начална страница
            </Button>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-8">
          Bouquets By Tanq - Изкуство в цветята
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
