// База данни с продукти - Реални продукти с техните ресурси
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Розов букет с персонаж (Hello Kitty стил)',
    slug: '21-pink-roses-hello-kitty',
    description: 'Нежен и закачлив букет от розови рози, създаден да носи радост и усмивки. Меките розови нюанси символизират грижа и внимание, а сладкият персонаж добавя игрив и емоционален акцент. Перфектен подарък за рожден ден, имен ден или специален жест към любимо момиче.',
    price: 2299,
    priceEur: 2299,
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
    description: 'Впечатляващ букет от червени рози с деликатен брокатен блясък, който улавя светлината и подчертава луксозния характер на аранжировката. Червеният цвят е символ на страст, любов и силни чувства – идеален избор за романтичен повод.',
    price: 2799,
    priceEur: 2799,
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
    price: 1599,
    priceEur: 1599,
    currency: 'eur',
    images: ['/tanq/3/Screenshot 2025-12-30 173645.png'],
    videos: [],
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'дълбоко бордо / тъмно червено',
      occasion: 'Официален'
    }
  },
  {
    id: 'prod_004',
    name: 'Розов букет с брокат и надпис „16"',
    slug: 'pink-glitter-bouquet',
    description: 'Фин и празничен букет от светлорозови рози с нежен брокатен ефект и персонализиран надпис. Розовият цвят носи мекота и романтика, а декоративният акцент прави букета отличен избор за рожден ден или специална годишнина.',
    price: 1599,
    priceEur: 1599,
    currency: 'eur',
    images: ['/tanq/4/Screenshot 2025-12-30 173706.png'],
    videos: ['/tanq/4/2.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'светло розово',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_005',
    name: 'Класически розов букет',
    slug: 'pink-roses-bouquet',
    description: 'Красив и семпъл букет от свежи розови рози, излъчващ нежност и топлина. Универсален избор, подходящ както за романтичен жест, така и за подарък без конкретен повод.',
    price: 1199,
    priceEur: 1199,
    currency: 'eur',
    images: ['/tanq/5/Screenshot 2025-12-30 174014.png'],
    videos: ['/tanq/5/🎀.mp4'],
    category: 'roses',
    inStock: true,
    metadata: {
      color: 'класическо розово',
      occasion: 'Универсален'
    }
  },
  {
    id: 'prod_006',
    name: 'Луксозен червен букет с пеперуда',
    slug: 'premium-luxury-bouquet',
    description: 'Луксозен букет от червени рози с фин брокатен блясък и декоративна пеперуда, която придава лекота и изящество. Силно визуално въздействащ подарък, създаден да впечатлява и да остава запомнящ се.',
    price: 2599,
    priceEur: 2599,
    currency: 'eur',
    images: ['/tanq/6/Screenshot 2025-12-30 174147.png'],
    videos: ['/tanq/6/AQOwocmxDtYlJ_xeUrE14yqQ8R_sGwDJzMPFztDa8LpsHhyqEY_oLirLlfBPMMi0KD4_7TEMA8SiJHgWJdw3nTnObglZeuI3.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      color: 'червено с брокатен ефект',
      occasion: 'Луксозен'
    }
  },
  {
    id: 'prod_007',
    name: 'Лилав букет с брокат',
    slug: '17-purple-glitter-roses',
    description: 'Уникален букет от лилави рози с нежен брокатен завършек. Лилавият цвят символизира мистерия, изтънченост и индивидуалност – отличен избор за човек, който обича различното и нестандартното.',
    price: 1799,
    priceEur: 1799,
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
    price: 1599,
    priceEur: 1599,
    currency: 'eur',
    images: ['/tanq/8/Screenshot 2025-12-30 174418.png'],
    videos: ['/tanq/8/Модел с два цвята, по ваш избор🤍🩵.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'синьо и кремаво',
      occasion: 'Хармония'
    }
  },
  {
    id: 'prod_009',
    name: 'Нежен букет в бяло и прасковено',
    slug: 'white-peach-bouquet',
    description: 'Нежен и топъл букет, съчетаващ чистотата на бялото с меките, слънчеви нюанси на прасковеното. Цветовата комбинация създава усещане за спокойствие, уют и искрена емоция. Подходящ подарък за рожден ден, изненада без повод или жест на внимание към близък човек.',
    price: 1599,
    priceEur: 1599,
    currency: 'eur',
    images: ['/tanq/9/Screenshot 2025-12-30 174527.png'],
    videos: ['/tanq/9/За поръчки и въпроси пишете на лс🤍🍑.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'бяло и прасковено',
      occasion: 'Рожден ден'
    }
  },
  {
    id: 'prod_010',
    name: 'Букет в бяло и синьо',
    slug: 'white-blue-bouquet',
    description: 'Елегантен и модерен букет с контрастна комбинация от бели и сини рози с лек брокатен ефект. Синьото носи усещане за дълбочина, доверие и спокойствие, а бялото добавя чистота и баланс. Отличен избор за стилен подарък с различен и запомнящ се характер.',
    price: 1599,
    priceEur: 1599,
    currency: 'eur',
    images: ['/tanq/10/Screenshot 2025-12-30 174645.png'],
    videos: ['/tanq/10/За поръчки и въпроси пишете на лс🩵🤍.mp4'],
    category: 'mixed',
    inStock: true,
    metadata: {
      color: 'бяло и наситено синьо',
      occasion: 'Стилен подарък'
    }
  },
  {
    id: 'prod_011',
    name: 'Най-търсеният модел букет',
    slug: 'most-popular-bouquet',
    description: 'Впечатляващ букет от червени рози с изразен брокатен блясък – модел, който привлича погледите и създава силно емоционално въздействие. Червеният цвят символизира любов, страст и увереност, което го прави идеален избор за романтични поводи и специални моменти.',
    price: 2199,
    priceEur: 2199,
    currency: 'eur',
    images: ['/tanq/11/Screenshot 2025-12-30 174801.png'],
    videos: ['/tanq/11/Най-търсеният модел😍❤️.mp4'],
    category: 'roses',
    inStock: true,
    featured: true,
    metadata: {
      color: 'червено с брокат',
      occasion: 'Романтичен'
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
