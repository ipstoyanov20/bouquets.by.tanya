import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all products (improves performance)
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate SEO metadata with Cyrillic support
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Bouquets By Tanq',
    };
  }

  return {
    title: `${product.name} | Bouquets By Tanq`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map(img => ({
        url: img,
        alt: product.name,
      })),
    },
  };
}

// Server Component - handles routing and data fetching
export default async function ProductDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Pass product to client component for interactivity
  return <ProductDetailClient product={product} />;
}
