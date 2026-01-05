// База данни с продукти - Реални продукти с техните ресурси
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Букет с 21 розови рози с персонализиран надпис и Hello Kitty',
    slug: '21-pink-roses-hello-kitty',
    description: 'Очарователен букет с 21 нежни розови рози, украсен с персонализиран надпис с цифра и изключително сладка Hello Kitty декорация. Перфектен избор за детски рожден ден или специално празненство. Направете деня незабравим с този уникален и нежен подарък.',
    price: 4200,
    priceEur: 4200,
    currency: 'eur',
    images: ['/tanq/1/Screenshot 2025-12-30 173202.png', '/tanq/1/Screenshot 2025-12-30 173229.png'],
    videos: [],
    category: 'special',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 21,
      color: 'pink',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_002',
    name: 'Букет от 27 червени брокатени рози',
    slug: '27-red-glitter-roses',
    description: 'Луксозен и впечатляващ букет от 27 червени рози с блестящ брокат. Елегантен и страстен избор за романтични поводи, годишнини или специални празненства. Червените брокатени рози създават незабравима визия и изразяват дълбоки чувства.',
    price: 5400,
    priceEur: 5400,
    currency: 'eur',
    images: ['/tanq/2/Screenshot 2025-12-30 173526.png'],
    videos: ['/tanq/2/q.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 27,
      color: 'red',
      occasion: 'Романтика'
    }
  },
  {
    id: 'prod_003',
    name: 'Елегантен букет от рози',
    slug: 'elegant-rose-bouquet',
    description: 'Изискан букет от висококачествени рози, създаден с внимание към детайла. Идеален подарък за всеки специален повод. Класическа красота и елегантност в една прекрасна композиция.',
    price: 3000,
    priceEur: 3000,
    currency: 'eur',
    images: ['/tanq/3/Screenshot 2025-12-30 173645.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_004',
    name: 'Букет от розови рози с брокат',
    slug: 'pink-glitter-bouquet',
    description: 'Нежен и стилен букет от розови рози с изискан брокатен финиш. Перфектна комбинация от нежност и блясък, идеална за романтични моменти, рождени дни или за да изразите своята любов и признателност по специален начин.',
    price: 3000,
    priceEur: 3000,
    currency: 'eur',
    images: ['/tanq/4/Screenshot 2025-12-30 173706.png'],
    videos: ['/tanq/4/2.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'pink',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_005',
    name: 'Букет от розови рози',
    slug: 'pink-roses-bouquet',
    description: 'Прекрасен букет от свежи розови рози, изразяващ нежност и романтика. Универсален избор за всеки повод - от романтични жестове до празненства. Розовите рози са символ на благодарност, възхищение и радост.',
    price: 2200,
    priceEur: 2200,
    currency: 'eur',
    images: ['/tanq/5/Screenshot 2025-12-30 174014.png'],
    videos: ['/tanq/5/🎀.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'pink',
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_006',
    name: 'Луксозен букет от рози премиум качество',
    slug: 'premium-luxury-bouquet',
    description: 'Впечатляващ букет от висококачествени рози, създаден за специални моменти. Изключителна композиция с внимание към всеки детайл, която ще остави незабравими спомени. Идеален за юбилеи, годишнини и грандиозни празненства.',
    price: 5000,
    priceEur: 5000,
    currency: 'eur',
    images: ['/tanq/6/Screenshot 2025-12-30 174147.png'],
    videos: ['/tanq/6/AQOwocmxDtYlJ_xeUrE14yqQ8R_sGwDJzMPFztDa8LpsHhyqEY_oLirLlfBPMMi0KD4_7TEMA8SiJHgWJdw3nTnObglZeuI3.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      occasion: 'Луксозен'
    }
  },
  {
    id: 'prod_007',
    name: 'Букет от 17 лилави рози с брокат',
    slug: '17-purple-glitter-roses',
    description: 'Уникален и изискан букет от 17 лилави рози, украсени с брокат. Лилавият цвят символизира елегантност, мистика и изтънченост. Перфектен избор за ценители на неконвенционалната красота и за специални празненства.',
    price: 3400,
    priceEur: 3400,
    currency: 'eur',
    images: ['/tanq/7/Screenshot 2025-12-30 174250.png'],
    videos: ['/tanq/7/17 лилави рози с брокат💜🤍.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 17,
      color: 'purple',
      occasion: 'Специален'
    }
  },
  {
    id: 'prod_008',
    name: 'Букет с два цвята по избор',
    slug: 'two-color-custom-bouquet',
    description: 'Персонализиран букет с две цветове по ваш избор. Създайте уникална комбинация, която отразява вашия стил и предпочитания. Идеален за тези, които търсят нещо специално и различно. Възможност за изцяло персонализирана композиция.',
    price: 3000,
    priceEur: 3000,
    currency: 'eur',
    images: ['/tanq/8/Screenshot 2025-12-30 174418.png'],
    videos: ['/tanq/8/Модел с два цвята, по ваш избор🤍🩵.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      occasion: 'Персонализиран'
    }
  },
  {
    id: 'prod_009',
    name: 'Нежен букет в бяло и праскова',
    slug: 'white-peach-bouquet',
    description: 'Изискана комбинация от бели и праскови рози, създаваща нежна и елегантна композиция. Перфектен избор за сватби, романтични моменти или специални празненства. Цветовете изразяват чистота, нежност и топлина.',
    price: 3000,
    priceEur: 3000,
    currency: 'eur',
    images: ['/tanq/9/Screenshot 2025-12-30 174527.png'],
    videos: ['/tanq/9/За поръчки и въпроси пишете на лс🤍🍑.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'white-peach',
      occasion: 'Сватба'
    }
  },
  {
    id: 'prod_010',
    name: 'Букет в бяло и синьо',
    slug: 'white-blue-bouquet',
    description: 'Свежа и елегантна комбинация от бели и сини рози. Уникален букет, който съчетава спокойствието на синьото с чистотата на белите цветове. Идеален за лятни празненства, морски тематики или за изразяване на дълбоки чувства.',
    price: 3000,
    priceEur: 3000,
    currency: 'eur',
    images: ['/tanq/10/Screenshot 2025-12-30 174645.png'],
    videos: ['/tanq/10/За поръчки и въпроси пишете на лс🩵🤍.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'white-blue',
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_011',
    name: 'Най-търсеният модел букет',
    slug: 'most-popular-bouquet',
    description: 'Нашият най-популярен и любим модел букет, който завладява сърцата на клиентите. Класическа композиция с модерен акцент, която е подходяща за всеки повод. Изборът на хиляди доволни клиенти за изразяване на специални чувства.',
    price: 4000,
    priceEur: 4000,
    currency: 'eur',
    images: ['/tanq/11/Screenshot 2025-12-30 174801.png'],
    videos: ['/tanq/11/Най-търсеният модел😍❤️.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      occasion: 'Универсален'
    }
  }
];

// Помощни функции за заявки към продукти
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured);
}

/**
 * Извличане на продукт по slug с подкрепа на Unicode
 * Поддържа латиница, кирилица и специални символи в URL адреси
 * 
 * Как работи:
 * 1. Декодира URL-кодирания slug (обработва кирилица в процент-кодиране)
 * 2. Нормализира към малки букви за сравнение без значение на регистъра
 * 3. Сравнява с всички slugs на продукти (също нормализирани)
 * 
 * Примери:
 * - Латиница: "21-red-pink-roses" → съвпада директно
 * - Кодирана кирилица: "%D1%80%D0%BE%D0%B7%D0%BE%D0%B2-%D0%B1%D1%83%D0%BA%D0%B5%D1%82" → декодира към "розов-букет"
 * - Смесено: "божури-lux" → работи както е
 */
export function getProductBySlug(slug: string): Product | undefined {
  try {
    // Декодира URL-кодирания slug (обработва %XX кодирани символи)
    const decodedSlug = decodeURIComponent(slug);
    
    // Нормализира за сравнение без значение на регистъра
    const normalizedSlug = decodedSlug.toLowerCase().trim();
    
    // Намира продукт с нормализирано сравнение
    return PRODUCTS.find(p => {
      const productSlug = p.slug.toLowerCase().trim();
      return productSlug === normalizedSlug;
    });
  } catch (error) {
    // Ако decodeURIComponent се провали (неправилен URI), опитва директно съвпадение
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
