import { Product } from './types';

// База данни с продукти - Ценова формула: 1 роза = 1.00 EUR (100 ст.), 1 добавка = 0.50 EUR (50 ст.)
// Цена = (брой_рози × 100) + (брой_добавки × 50) — всички стойности са в евроцентове
export const PRODUCTS: Product[] = [

{
    id: 'prod_001',
    name: 'Розов букет с персонаж (Hello Kitty стил)',
    slug: '21-pink-roses-hello-kitty',
    description: 'Нежен и закачлив букет от розови рози, създаден да носи радост и усмивки. Меките розови нюанси символизират грижа и внимание, а сладкият персонаж добавя игрив и емоционален акцент. Перфектен подарък за рожден ден, имен ден или специален жест към любимо момиче.',
    price: 2150, // 21 рози × 100 + 1 добавка × 50
    priceEur: 2150,
    currency: 'eur',
    images: ['/tanq/1/Screenshot 2025-12-30 173202.png', '/tanq/1/Screenshot 2025-12-30 173229.png'],
    videos: [],
    category: 'special',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 21,
      color: 'нежно розово',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_002',
    name: 'Червен букет с брокат',
    slug: '27-red-glitter-roses',
    description: 'Впечатляващ букет от червени рози с деликатен брокатен блясък, който улавя светлината и подчертава луксозния характер на аранжировката. Червеният цвят е символ на страст, любовь и силни чувства – идеален избор за романтичен повод.',
    price: 2750, // 27 рози × 100 + 1 добавка × 50
    priceEur: 2750,
    currency: 'eur',
    images: ['/tanq/2/Screenshot 2025-12-30 173526.png'],
    videos: ['/tanq/2/q.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 27,
      color: 'наситено червено',
      occasion: 'Романтика'
    }
  },
  {
    id: 'prod_003',
    name: 'Елегантен букет от тъмночервени рози',
    slug: 'elegant-rose-bouquet',
    description: 'Изискан букет от тъмночервени рози, подредени в стилна и плътна форма. Дълбокият цвят създава усещане за класа, зрялост и елегантност. Подходящ за официален подарък или силно емоционално послание.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/3/Screenshot 2025-12-30 173645.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'дълбоко бордо / тъмно червено',
      occasion: 'Официален'
    }
  },
  {
    id: 'prod_004',
    name: 'Розов букет с брокат и надпис „16"',
    slug: 'pink-glitter-bouquet',
    description: 'Фин и празничен букет от светлорозови рози с нежен брокатен ефект и персонализиран надпис. Розовият цвят носи мекота и романтика, а декоративният акцент прави букета отличен избор за рожден ден или специална годишнина.',
    price: 1650, // 16 рози × 100 + 1 добавка × 50
    priceEur: 1650,
    currency: 'eur',
    images: ['/tanq/4/Screenshot 2025-12-30 173706.png'],
    videos: ['/tanq/4/2.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 16,
      color: 'светло розово',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_005',
    name: 'Класически розов букет',
    slug: 'pink-roses-bouquet',
    description: 'Красив и семпъл букет от свежи розови рози, излъчващ нежност и топлина. Универсален избор, подходящ както за романтичен жест, така и за подарък без конкретен повод.',
    price: 1150, // 11 рози × 100 + 1 добавка × 50
    priceEur: 1150,
    currency: 'eur',
    images: ['/tanq/5/Screenshot 2025-12-30 174014.png'],
    videos: ['/tanq/5/🎀.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 11,
      color: 'класическо розово',
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_006',
    name: 'Луксозен червен букет с пеперуда',
    slug: 'premium-luxury-bouquet',
    description: 'Луксозен букет от червени рози с фин брокатен блясък и декоративна пеперуда, която придава лекота и изящество. Силно визуално въздействащ подарък, създаден да впечатлява и да остава запомнящ се.',
    price: 2550, // 25 рози × 100 + 1 добавка × 50
    priceEur: 2550,
    currency: 'eur',
    images: ['/tanq/6/Screenshot 2025-12-30 174147.png'],
    videos: ['/tanq/6/AQOwocmxDtYlJ_xeUrE14yqQ8R_sGwDJzMPFztDa8LpsHhyqEY_oLirLlfBPMMi0KD4_7TEMA8SiJHgWJdw3nTnObglZeuI3.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 25,
      color: 'червено с брокатен ефект',
      occasion: 'Луксозен'
    }
  },
  {
    id: 'prod_007',
    name: 'Лилав букет с брокат',
    slug: '17-purple-glitter-roses',
    description: 'Уникален букет от лилави рози с нежен брокатен завършек. Лилавият цвят символизира мистерия, изтънченост и индивидуалност – отличен избор за човек, който обича различното и нестандартното.',
    price: 1750, // 17 рози × 100 + 1 добавка × 50
    priceEur: 1750,
    currency: 'eur',
    images: ['/tanq/7/Screenshot 2025-12-30 174250.png'],
    videos: ['/tanq/7/17 лилави рози с брокат💜🤍.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 17,
      color: 'лилаво',
      occasion: 'Специален'
    }
  },
  {
    id: 'prod_008',
    name: 'Двуцветен букет (синьо и кремаво)',
    slug: 'two-color-custom-bouquet',
    description: 'Модерен двуцветен букет, комбиниращ спокойствието на сините рози с мекотата на кремавите нюанси. Балансирана и стилна визия, подходяща за подарък с послание за хармония, доверие и елегантност.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/8/Screenshot 2025-12-30 174418.png'],
    videos: ['/tanq/8/Модел с два цвята, по ваш избор🤍🩵.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'синьо и кремаво',
      occasion: 'Хармония'
    }
  },
  {
    id: 'prod_009',
    name: 'Нежен букет в бяло и прасковено',
    slug: 'white-peach-bouquet',
    description: 'Нежен и топъл букет, съчетаващ чистотата на бялото с меките, слънчеви нюанси на прасковеното. Цветовата комбинация създава усещане за спокойствие, уют и искрена емоция. Подходящ подарък за рожден ден, изненада без повод или жест на внимание към близък човек.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/9/Screenshot 2025-12-30 174527.png'],
    videos: ['/tanq/9/За поръчки и въпроси пишете на лс🤍🍑.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'бяло и прасковено',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_010',
    name: 'Букет в бяло и синьо',
    slug: 'white-blue-bouquet',
    description: 'Елегантен и модерен букет с контрастна комбинация от бели и сини рози с лек брокатен ефект. Синьото носи усещане за дълбочина, доверие и спокойствие, а бялото добавя чистота и баланс. Отличен избор за стилен подарък с различен и запомнящ се характер.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/10/Screenshot 2025-12-30 174645.png'],
    videos: ['/tanq/10/За поръчки и въпроси пишете на лс🩵🤍.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'бяло и наситено синьо',
      occasion: 'Стилен подарък'
    }
  },
  {
    id: 'prod_011',
    name: 'Най-търсеният модел букет',
    slug: 'most-popular-bouquet',
    description: 'Впечатляващ букет от червени рози с изразен брокатен блясък – модел, който привлича погледите и създава силно емоционално въздействие. Червеният цвят символизира любов, страст и увереност, което го прави идеален избор за романтични поводи и специални моменти.',
    price: 2150, // 21 рози × 100 + 1 добавка × 50
    priceEur: 2150,
    currency: 'eur',
    images: ['/tanq/11/Screenshot 2025-12-30 174801.png'],
    videos: ['/tanq/11/Най-търсеният модел😍❤️.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 21,
      color: 'червено с брокат',
      occasion: 'Романтичен'
    }
  },
  {
    id: 'prod_012',
    name: 'Букет в оранжево и розово',
    slug: 'orange-pink-bouquet',
    description: 'Ярък и енергичен букет, който съчетава жизнерадостното оранжево с нежно розово. Перфектен за подарък, който носи добро настроение и усмивки.',
    price: 1850, // 18 рози × 100 + 1 добавка × 50
    priceEur: 1850,
    currency: 'eur',
    images: ['/tanq/12/image.png'],
    videos: [],
    category: 'mixed',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 18,
      color: 'оранжево и розово',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_013',
    name: 'Нежен розов букет',
    slug: 'gentle-pink-roses',
    description: 'Класически букет от розови рози, излъчваща нежност и чистота. Идеален за романтичен жест или израз на искрена признателност.',
    price: 1650, // 16 рози × 100 + 1 добавка × 50
    priceEur: 1650,
    currency: 'eur',
    images: ['/tanq/13/image.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 16,
      color: 'розово',
      occasion: 'Романтичен'
    }
  },
  {
    id: 'prod_014',
    name: 'Елегантен лилав букет',
    slug: 'elegant-purple-roses',
    description: 'Изискан букет в лилави нюанси, символизиращи чудо и очарование. Стилно решение за специални поводи и неповторими моменти.',
    price: 1750, // 17 рози × 100 + 1 добавка × 50
    priceEur: 1750,
    currency: 'eur',
    images: ['/tanq/14/image.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 17,
      color: 'лилаво',
      occasion: 'Официален'
    }
  },
  {
    id: 'prod_015',
    name: 'Наситено червен букет',
    slug: 'vibrant-red-roses',
    description: 'Впечатляващ букет от наситено червени рози – класически символ на любовта. Перфектен избор за романтичен жест или специално събитие.',
    price: 1950, // 19 рози × 100 + 1 добавка × 50
    priceEur: 1950,
    currency: 'eur',
    images: ['/tanq/15/image.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 19,
      color: 'червено',
      occasion: 'Любов'
    }
  },
  {
    id: 'prod_016',
    name: 'Луксозен бял букет (Dior стил)',
    slug: 'luxury-white-dior-roses',
    description: 'Ексклузивен модел бял букет, аранжиран със стилна хартия в Dior стил. Луксът среща изтънчеността в тази уникална композиция.',
    price: 2450, // 24 рози × 100 + 1 добавка × 50
    priceEur: 2450,
    currency: 'eur',
    images: ['/tanq/16/image.png'],
    videos: [],
    category: 'special',
    inStock: true,
    featured: true,
    metadata: {
      roses_count: 24,
      color: 'бяло',
      occasion: 'Луксозен подарък'
    }
  },
  {
    id: 'prod_017',
    name: 'Класически червен букет',
    slug: 'classic-red-roses-bouquet',
    description: 'Още една вариация на любимите червени рози, предлагаща плътност и качество, което ще радва притежателя си дълго време.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/17/image.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'червено',
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_018',
    name: 'Светло розов подаръчен букет',
    slug: 'light-pink-roses-bouquet',
    description: 'Деликатен букет от светло розови рози, аранжиран до съвършенство за Вашия подарък. Излъчва мекота и грижовност.',
    price: 1550, // 15 рози × 100 + 1 добавка × 50
    priceEur: 1550,
    currency: 'eur',
    images: ['/tanq/18/image.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      roses_count: 15,
      color: 'светло розово',
      occasion: 'Подарък'
    }
  }
];

// Ценови константи
export const PRICE_PER_ROSE_CENTS = 100;  // 1 роза = 1.00 EUR
export const PRICE_PER_ADDON_CENTS = 50;  // 1 добавка = 0.50 EUR

/**
 * Изчислява цената на букет по формулата:
 * цена = (брой_рози × 100) + (брой_добавки × 50)
 */
export function calculateBouquetPrice(roseCount: number, addonCount: number = 1): number {
  return roseCount * PRICE_PER_ROSE_CENTS + addonCount * PRICE_PER_ADDON_CENTS;
}

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
