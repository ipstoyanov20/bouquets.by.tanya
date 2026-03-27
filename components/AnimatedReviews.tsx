'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { useRef, useMemo } from 'react';

// Mock data generation for 100 reviews
const MALE_NAMES = ["Георги", "Иван", "Димитър", "Николай", "Стефан", "Борис", "Милен", "Александър", "Пламен", "Константин", "Тодор", "Васил", "Стоян", "Петър", "Христо", "Ангел", "Йордан", "Кирил", "Любомир", "Мариян", "Радослав", "Станислав", "Атанас", "Боян", "Валентин", "Даниел", "Емил", "Ивелин", "Красимир", "Мартин"];
const FEMALE_NAMES = ["Мария", "Елена", "Десислава", "Петя", "Анна", "Снежина", "Мирослава", "Гергана", "Радослава", "Цветелина", "Йорданка", "Теодора", "Биляна", "Даниела", "Евелина", "Зорница", "Ивана", "Калина", "Лилия", "Марина", "Надежда", "Оля", "Павлина", "Росица", "Силвия", "Татяна", "Христина", "Юлия", "Яна", "Антония"];
const CYRILLIC_INITIALS = ["А.", "Б.", "В.", "Г.", "Д.", "Е.", "Ж.", "З.", "И.", "Й.", "К.", "Л.", "М.", "Н.", "О.", "П.", "Р.", "С.", "Т.", "У.", "Ф.", "Х.", "Ц.", "Ч.", "Ш.", "Щ.", "Ю.", "Я."];

const MALE_TEXTS = [
  "Страхотен букет! Изключително качество.",
  "Много съм доволен от поръчката. Изглежда реално.",
  "Бърза доставка с Еконт. Препоръчвам на всички!",
  "Перфектен подарък за рожден ден. Много добра работа.",
  "Благодаря за вниманието към детайла. Уникално е.",
  "Цветовете са невероятни! Като истински са.",
  "Най-хубавият подарък, който съм купувал скоро.",
  "Професионално изпълнение и много точна доставка.",
  "Изкуствените рози са направени майсторски.",
  "Страхотно допълнение към интериора на офиса ми."
];

const FEMALE_TEXTS = [
  "Най-красивите букети, които съм поръчвала някога!",
  "Изключително реалистично изпълнение. Много съм доволна.",
  "Бърза и точна доставка. Препоръчвам горещо на всички!",
  "Перфектен подарък! Очарована съм от всеки детайл.",
  "Благодаря за вниманието към детайла. Страхотна работа!",
  "Цветовете са невероятни! Озаряват стаята ми всеки ден.",
  "Най-прекрасният букет, който съм имала. Благодаря!",
  "Много внимателно опаковано и пристигна в перфектно състояние.",
  "Изглеждат като истински цветя, дори отблизо.",
  "Определено ще поръчам отново за следващия празник."
];

const SECOND_PHRASES = [
  " Всички вкъщи са очаровани.",
  " Детайлите са просто перфектни.",
  " Изработката е на много високо ниво.",
  " Стои страхотно във вазата.",
  " Много стилен и нежен подарък.",
  " Доставката беше буквално на следващия ден.",
  " Препоръчвам с две ръце!",
  " Най-добрият избор за подарък.",
  " Качеството надмина очакванията ми.",
  " Благодаря за бързата реакция!"
];

const REVIEWS = Array.from({ length: 100 }, (_, i) => {
  const isFemale = i % 2 === 0;
  const nameList = isFemale ? FEMALE_NAMES : MALE_NAMES;
  const textList = isFemale ? FEMALE_TEXTS : MALE_TEXTS;
  const gender = isFemale ? 'women' : 'men';
  
  const firstName = nameList[Math.floor(i / 2) % nameList.length];
  const initial = CYRILLIC_INITIALS[i % CYRILLIC_INITIALS.length];
  
  // Combine phrases to ensure uniqueness for all 100 items
  const mainText = textList[Math.floor(i / 10) % textList.length];
  const secondPhrase = SECOND_PHRASES[i % SECOND_PHRASES.length];
  
  return {
    id: i,
    name: `${firstName} ${initial}`,
    text: mainText + secondPhrase,
    rating: 5,
    avatar: `https://randomuser.me/api/portraits/${gender}/${(i % 50) + 1}.jpg`,
  };
});

export function AnimatedReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create 3 rows of reviews with different offsets for diagonal feel
  const row1 = useMemo(() => [...REVIEWS.slice(0, 33), ...REVIEWS.slice(0, 33)], []);
  const row2 = useMemo(() => [...REVIEWS.slice(33, 66), ...REVIEWS.slice(33, 66)], []);
  const row3 = useMemo(() => [...REVIEWS.slice(66, 100), ...REVIEWS.slice(66, 100)], []);

  return (
    <div className="relative w-full overflow-hidden py-10 bg-slate-50/30">
      <div 
        ref={containerRef}
        className="flex flex-col gap-6 -rotate-6 scale-110 opacity-70 hover:opacity-100 transition-opacity duration-700 select-none"
      >
        {/* Row 1 - Moving Right */}
        <div className="flex gap-6 whitespace-nowrap">
          <motion.div 
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {row1.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moving Left */}
        <div className="flex gap-6 whitespace-nowrap">
          <motion.div 
            className="flex gap-6"
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {row2.map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Row 3 - Moving Right */}
        <div className="flex gap-6 whitespace-nowrap">
          <motion.div 
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {row3.map((review, i) => (
              <ReviewCard key={`r3-${i}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradients for edge smoothing */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-slate-50 via-transparent to-slate-50 opacity-100" />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-slate-50 via-transparent to-slate-50 opacity-100" />
    </div>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        borderColor: "rgb(225 29 72 / 0.2)"
      }}
      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs min-w-[280px] w-[280px] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-rose-50 overflow-hidden ring-2 ring-rose-50/50">
          <img 
            src={review.avatar} 
            alt={review.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement).style.display = 'flex';
            }}
          />
          <div className="fallback-icon hidden w-full h-full items-center justify-center">
            <User className="w-5 h-5 text-rose-500" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{review.name}</h4>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
        "{review.text}"
      </p>
    </motion.div>
  );
}
