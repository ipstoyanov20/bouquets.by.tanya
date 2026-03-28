'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useToast } from '@/contexts/ToastContext';

export default function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();
  const { showToast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const handleRemove = (productId: string) => {
    removeItem(productId);
    showToast('Продуктът беше премахнат от количката.', 'error');
  };

  if (cart.items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Количката е празна</h2>
          <p className="text-gray-600 mb-6">Добави продукти, за да продължиш с поръчката</p>
          <Link href="/products">
            <Button size="lg">Разгледай продукти</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Количка</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.items.map((item) => (
                <motion.div 
                  key={item.product.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: 20, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="grow min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-sm sm:text-base text-gray-900 hover:text-rose-600 transition-colors block truncate"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {formatPrice(item.customPrice || item.product.price, item.product.currency)}
                        {item.customRoseCount && (
                          <span className="ml-2 text-rose-600 font-medium">
                            • {item.customRoseCount} рози
                          </span>
                        )}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 sm:px-4 font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          className="text-red-600 hover:text-red-700 transition-colors touch-manipulation p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-base text-gray-900">
                        {formatPrice((item.customPrice || item.product.price) * item.quantity, item.product.currency)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Обобщение</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Междинна сума:</span>
                  <span className="font-medium">{formatPrice(cart.subtotal, 'EUR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ДДС (20%):</span>
                  <span className="font-medium">{formatPrice(cart.tax, 'EUR')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Общо:</span>
                    <span className="font-bold text-lg text-rose-600">
                      {formatPrice(cart.total, 'EUR')}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Продължи към плащане
                </Button>
              </Link>

              <Link href="/products" className="block">
                <Button size="lg" variant="outline" className="w-full mt-3">
                  Продължи пазаруването
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
