'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { getProductBySlug } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const allMedia = [...product.images, ...(product.videos || [])];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <div>
            {/* Main Media */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
              {allMedia[selectedImage] ? (
                allMedia[selectedImage].endsWith('.mp4') ? (
                  <video
                    src={allMedia[selectedImage]}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={allMedia[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
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
              <div className="grid grid-cols-4 gap-4">
                {allMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-rose-600' : ''
                    }`}
                  >
                    {media.endsWith('.mp4') ? (
                      <video src={media} className="w-full h-full object-cover" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-rose-600">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            {product.metadata && (
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Характеристики:</h3>
                <ul className="space-y-2">
                  {product.metadata.roses_count && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Брой рози:</span>
                      <span className="font-medium">{product.metadata.roses_count}</span>
                    </li>
                  )}
                  {product.metadata.color && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Цвят:</span>
                      <span className="font-medium">{product.metadata.color}</span>
                    </li>
                  )}
                  {product.metadata.occasion && (
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Повод:</span>
                      <span className="font-medium">{product.metadata.occasion}</span>
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
