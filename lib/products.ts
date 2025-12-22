// Product database - Production data mapped to actual assets
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Букет от 21 червени и розови рози',
    slug: '21-red-pink-roses',
    description: 'Елегантен букет от 21 червени и розови рози, перфектен за всеки специален повод. Високо качество изкуствени цветя с реалистичен вид.',
    price: 8900, // 89.00 BGN in cents
    currency: 'bgn',
    images: ['/tanq/Букет за всеки повод❤️.jpg'],
    videos: ['/tanq/21 червени и розови рози🍒🩷.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 21,
      color: 'red-pink',
      occasion: 'universal'
    }
  },
  {
    id: 'prod_002',
    name: 'Букет от 41 червени вечни рози с брокат',
    slug: '41-red-glitter-roses',
    description: 'Луксозен букет от 41 червени вечни рози с брокат. Изключителен подарък за юбилей, годишнина или специално празненство.',
    price: 15900,
    currency: 'bgn',
    images: ['/tanq/Букет от 41 червени вечни рози с брокат.jpg'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 41,
      color: 'red',
      occasion: 'anniversary'
    }
  },
  {
    id: 'prod_003',
    name: 'Букет от 71 червени рози с брокат',
    slug: '71-red-glitter-roses',
    description: 'Впечатляващ букет от 71 червени рози с брокат. Грандиозен подарък за най-специалните моменти в живота.',
    price: 25900,
    currency: 'bgn',
    images: ['/tanq/Букет от 71 червени рози с брокат.jpg'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 71,
      color: 'red',
      occasion: 'luxury'
    }
  },
  {
    id: 'prod_004',
    name: 'Букет с 21 розови рози с Hello Kitty',
    slug: '21-pink-roses-hello-kitty',
    description: 'Очарователен букет с 21 розови рози, персонализиран надпис с цифра и Hello Kitty декорация. Идеален за детски рожден ден.',
    price: 9900,
    currency: 'bgn',
    images: ['/tanq/Букет с 21 розови рози надпис с цифра и hallo kitty🩷.jpg'],
    category: 'special',
    inStock: true,
    metadata: {
      roses_count: 21,
      color: 'pink',
      occasion: 'birthday'
    }
  },
  {
    id: 'prod_005',
    name: 'Букет с 9 прасковени рози',
    slug: '9-peach-roses',
    description: 'Нежен букет с 9 прасковени рози. Финес и елегантност в компактна форма.',
    price: 4900,
    currency: 'bgn',
    images: ['/tanq/Букет с 9 прасковени рози🍑🤍.jpg'],
    videos: ['/tanq/Букет с 9 прасковени рози🍑🤍.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 9,
      color: 'peach',
      occasion: 'romantic'
    }
  },
  {
    id: 'prod_006',
    name: 'Букет с черни рози',
    slug: 'black-roses',
    description: 'Драматичен и уникален букет с черни рози. Перфектен за готически стил или специални тематични събития.',
    price: 7900,
    currency: 'bgn',
    videos: ['/tanq/Букет с черни рози🖤.mp4'],
    images: ['/tanq/Букет за всеки повод❤️.jpg'], // Placeholder until we have actual image
    category: 'special',
    inStock: true,
    metadata: {
      color: 'black',
      occasion: 'gothic'
    }
  },
  {
    id: 'prod_007',
    name: 'Букет цвят диня с бяла органза',
    slug: 'watermelon-white-organza',
    description: 'Свеж букет в цвят диня с нежна бяла органза. Перфектна комбинация за лятна сватба или празник.',
    price: 8500,
    currency: 'bgn',
    videos: ['/tanq/Букет цвят диня с бяла органза.mp4'],
    images: ['/tanq/Букет за всеки повод❤️.jpg'], // Placeholder
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'watermelon',
      occasion: 'wedding'
    }
  },
  {
    id: 'prod_008',
    name: 'Нов модел за абитуриенти',
    slug: 'graduation-bouquet',
    description: 'Специално създаден букет за абитуриенти. Стилен и модерен дизайн за вашия специален ден.',
    price: 6900,
    currency: 'bgn',
    images: ['/tanq/Нов модел за абитуриенти.jpg'],
    category: 'special',
    inStock: true,
    metadata: {
      occasion: 'graduation'
    }
  },
  {
    id: 'prod_009',
    name: 'Розови рози - Колекция 1',
    slug: 'pink-roses-collection-1',
    description: 'Красива колекция от розови рози с уникална аранжировка.',
    price: 7500,
    currency: 'bgn',
    videos: ['/tanq/rozi.mp4'],
    images: ['/tanq/Букет за всеки повод❤️.jpg'], // Placeholder
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'pink'
    }
  },
  {
    id: 'prod_010',
    name: 'Розови рози - Колекция 2',
    slug: 'pink-roses-collection-2',
    description: 'Втора колекция от изискани розови рози.',
    price: 7500,
    currency: 'bgn',
    videos: ['/tanq/rozi2.mp4'],
    images: ['/tanq/Букет за всеки повод❤️.jpg'], // Placeholder
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'pink'
    }
  },
  {
    id: 'prod_011',
    name: 'Розови рози - Колекция 3',
    slug: 'pink-roses-collection-3',
    description: 'Трета колекция от нежни розови рози.',
    price: 7500,
    currency: 'bgn',
    videos: ['/tanq/rozi3.mp4'],
    images: ['/tanq/Букет за всеки повод❤️.jpg'], // Placeholder
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'pink'
    }
  }
];

// Helper functions for product queries
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

/**
 * Get product by slug with robust Unicode-safe handling
 * Supports Latin, Cyrillic, and special characters in URLs
 * 
 * How it works:
 * 1. URL-decodes the incoming slug (handles percent-encoded Cyrillic)
 * 2. Normalizes to lowercase for case-insensitive matching
 * 3. Compares against all product slugs (also normalized)
 * 
 * Examples:
 * - Latin: "21-red-pink-roses" → matches directly
 * - Encoded Cyrillic: "%D1%80%D0%BE%D0%B7%D0%BE%D0%B2-%D0%B1%D1%83%D0%BA%D0%B5%D1%82" → decodes to "розов-букет"
 * - Mixed: "божури-lux" → works as-is
 */
export function getProductBySlug(slug: string): Product | undefined {
  try {
    // Decode URL-encoded slug (handles %XX encoded characters)
    const decodedSlug = decodeURIComponent(slug);
    
    // Normalize for case-insensitive comparison
    const normalizedSlug = decodedSlug.toLowerCase().trim();
    
    // Find product with normalized comparison
    return PRODUCTS.find(p => {
      const productSlug = p.slug.toLowerCase().trim();
      return productSlug === normalizedSlug;
    });
  } catch (error) {
    // If decodeURIComponent fails (malformed URI), try direct match
    const normalizedSlug = slug.toLowerCase().trim();
    return PRODUCTS.find(p => p.slug.toLowerCase().trim() === normalizedSlug);
  }
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}
