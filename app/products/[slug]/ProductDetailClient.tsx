'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { RoseCountSelector } from '@/components/RoseCountSelector';
import { calculateBouquetPrice } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Check, Play } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [roseCount, setRoseCount] = useState(product.metadata?.roses_count || 11);
  const [showFlyer, setShowFlyer] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleAddToCart = () => {
    const customPrice = calculateBouquetPrice(roseCount, 1);
    addItem(product, roseCount, customPrice);
    setAdded(true);
    if (!shouldReduceMotion) setShowFlyer(true);
    showToast('Продуктът е добавен в количката!');
    
    setTimeout(() => {
      setAdded(false);
      setShowFlyer(false);
    }, 2000);
  };

  // Calculate current price based on rose count: roses × 100¢ + 1 addon × 50¢
  const calculateCurrentPrice = () => {
    return calculateBouquetPrice(roseCount, 1);
  };

  const currentPrice = calculateCurrentPrice();

  // Combine media and remove duplicates
  const allMedia = Array.from(new Set([...product.images, ...(product.videos || [])]));
  
  // Helper to get color hex code
  const getColorHex = (colorName: string): string | null => {
    const colorMap: Record<string, string> = {
      'red': '#DC2626',
      'red-pink': 'linear-gradient(90deg, #DC2626 50%, #EC4899 50%)',
      'pink': '#EC4899',
      'peach': '#FDBA74',
      'black': '#1F2937',
      'watermelon': '#FB7185',
      'white': '#FFFFFF',
      'white-peach': 'linear-gradient(90deg, #FFFFFF 50%, #FDBA74 50%)',
      'white-blue': 'linear-gradient(90deg, #FFFFFF 50%, #3B82F6 50%)',
      'blue': '#3B82F6',
      'yellow': '#FBBF24',
      'purple': '#A855F7',
      'orange': '#F97316',
    };
    return colorMap[colorName.toLowerCase()] || null;
  };

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Media Gallery */}
          <div>
            {/* Main Media */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 sm:mb-4 relative" ref={imageRef}>
              {allMedia.length > 0 && allMedia[selectedImage] ? (
                allMedia[selectedImage].endsWith('.mp4') ? (
                  <video
                    src={allMedia[selectedImage]}
                    controls
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={allMedia[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Media
                </div>
              )}

              {/* Flyer Animation */}
              <AnimatePresence>
                {showFlyer && !allMedia[selectedImage].endsWith('.mp4') && (
                  <motion.div
                    initial={{ 
                      position: 'fixed',
                      top: imageRef.current?.getBoundingClientRect().top,
                      left: imageRef.current?.getBoundingClientRect().left,
                      width: imageRef.current?.offsetWidth,
                      height: imageRef.current?.offsetHeight,
                      opacity: 1,
                      zIndex: 100,
                      borderRadius: '12px'
                    }}
                    animate={{ 
                      top: 20, // Approximate header position
                      left: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
                      width: 40,
                      height: 40,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                    className="pointer-events-none overflow-hidden bg-white shadow-xl"
                  >
                    <Image
                      src={allMedia[selectedImage]}
                      alt="flyer"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {allMedia.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {allMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden touch-manipulation ${
                      selectedImage === index ? 'ring-2 ring-rose-600' : ''
                    }`}
                  >
                    {media.endsWith('.mp4') ? (
                      <>
                        <video src={media} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                      </>
                    ) : (
                      <Image
                        src={media}
                        alt={`${product.name} ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>
            
            <div className="mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-rose-600">
                {formatPrice(currentPrice, product.currency)}
              </span>
              {currentPrice !== product.price && (
                <span className="ml-3 text-lg text-gray-400 line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>

            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            {product.metadata && (
              <div className="border-t border-b border-gray-200 py-4 sm:py-6 mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Характеристики:</h3>
                <ul className="space-y-2">
                  {product.metadata.occasion && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Повод:</span>
                      <span className="font-medium text-gray-900">{product.metadata.occasion}</span>
                    </li>
                  )}
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-600">Наличност:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'В наличност' : 'Изчерпан'}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Rose Count Selector */}
            <div className="mb-6">
              <RoseCountSelector 
                value={roseCount} 
                onChange={setRoseCount}
              />
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock || added}
              className="w-full"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Добавено в количката
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Добави в количката
                </>
              )}
            </Button>

            {!product.inStock && (
              <p className="mt-4 text-center text-red-600 text-sm">
                Този продукт временно не е наличен
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
