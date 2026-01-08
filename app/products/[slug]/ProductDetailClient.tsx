'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { RoseCountSelector } from '@/components/RoseCountSelector';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Check, Play } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [roseCount, setRoseCount] = useState(product.metadata?.roses_count || 11);

  const handleAddToCart = () => {
    const originalRoseCount = product.metadata?.roses_count || 11;
    const pricePerRose = product.price / originalRoseCount;
    const customPrice = Math.round(pricePerRose * roseCount);
    
    addItem(product, roseCount, customPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Calculate current price based on rose count
  const calculateCurrentPrice = () => {
    const originalRoseCount = product.metadata?.roses_count || 11;
    const pricePerRose = product.price / originalRoseCount;
    return Math.round(pricePerRose * roseCount);
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
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 sm:mb-4">
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
