'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Clear cart after successful payment
      clearCart();
      setLoading(false);
    } else {
      // No session ID, redirect to home
      router.push('/');
    }
  }, [sessionId, clearCart, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[60vh] flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Плащането е успешно!</h1>
          
          <p className="text-gray-600 mb-6">
            Благодарим ви за поръчката! Ще получите потвърждение на имейла си скоро.
            Вашата поръчка ще бъде обработена в най-кратък срок.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Референтен номер:</strong><br />
              {sessionId}
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/products">
              <Button size="lg" className="w-full">
                Продължи пазаруването
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full">
                Към началната страница
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
