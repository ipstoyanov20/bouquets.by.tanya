'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/Button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useToast } from '@/contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [showFlyer, setShowFlyer] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    if (!shouldReduceMotion) setShowFlyer(true);
    showToast(`"${product.name}" е добавен в количката!`);
    setTimeout(() => setShowFlyer(false), 800);
  };

  // Функция за получаване на цветове от metadata
  const getColorBadges = () => {
    if (!product.metadata?.color) return null;
    
    const colorMap: Record<string, string> = {
      'нежно розово': '#FFB6C1',
      'розово': '#FFC0CB',
      'класическо розово': '#FFB6D9',
      'светло розово': '#FFD9E6',
      'наситено червено': '#DC143C',
      'червено': '#FF0000',
      'червено с брокатен ефект': '#B22222',
      'червено с брокат': '#B22222',
      'дълбоко бордо / тъмно червено': '#800020',
      'бордо': '#800020',
      'лилаво': '#9370DB',
      'лилав': '#9370DB',
      'синьо': '#4169E1',
      'наситено синьо': '#0047AB',
      'бяло': '#FFFFFF',
      'кремаво': '#FFFDD0',
      'прасковено': '#FFDAB9',
      'оранжево': '#FF8C00',
    };

    const colorText = product.metadata.color.toLowerCase();
    const colors: string[] = [];
    
    // Проверка за двуцветни букети
    if (colorText.includes(' и ')) {
      const parts = colorText.split(' и ');
      parts.forEach((part) => {
        const trimmed = part.trim();
        Object.keys(colorMap).forEach((key) => {
          if (trimmed.includes(key) || key.includes(trimmed)) {
            if (!colors.includes(colorMap[key])) {
              colors.push(colorMap[key]);
            }
          }
        });
      });
    } else {
      // Един цвят
      Object.keys(colorMap).forEach((key) => {
        if (colorText.includes(key) || key.includes(colorText)) {
          if (!colors.includes(colorMap[key])) {
            colors.push(colorMap[key]);
          }
        }
      });
    }

    return colors.length > 0 ? colors : null;
  };

  const colorBadges = getColorBadges();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden h-full relative"
      ref={cardRef}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Изчерпан</span>
          </div>
        )}

        {/* Flyer Animation */}
        <AnimatePresence>
          {showFlyer && product.images[0] && (
            <motion.div
              initial={{ 
                position: 'fixed',
                top: cardRef.current?.getBoundingClientRect().top,
                left: cardRef.current?.getBoundingClientRect().left,
                width: cardRef.current?.offsetWidth,
                height: cardRef.current?.offsetHeight,
                opacity: 1,
                zIndex: 100,
                borderRadius: '12px'
              }}
              animate={{ 
                top: 20,
                left: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
                width: 40,
                height: 40,
                opacity: 0,
                scale: 0.5,
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none overflow-hidden bg-white shadow-xl"
            >
              <Image
                src={product.images[0]}
                alt="flyer"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors flex-1">
            {product.name}
          </h3>
          {colorBadges && colorBadges.length > 0 && (
            <div className="flex gap-1 shrink-0">
              {colorBadges.map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={product.metadata?.color}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-rose-600">
            {formatPrice(product.price, product.currency)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Добави
          </Button>
        </div>
      </div>
    </Link>
  );
}
