'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, User } from 'lucide-react';
import { useRef, useMemo } from 'react';

// Mock data generation for 100 reviews
const NAMES = ["Георги", "Мария", "Иван", "Елена", "Димитър", "Десислава", "Николай", "Петя", "Стефан", "Анна", "Борис", "Милен", "Снежина", "Александър", "Мирослава"];
const TEXTS = [
  "Най-красивите букети, които съм поръчвал!",
  "Изглеждат изключително реалистично.",
  "Бърза и точна доставка. Препоръчвам!",
  "Перфектен подарък за рожден ден.",
  "Много съм доволна от качеството.",
  "Страхотно обслужване!",
  "Букетът стои страхотно във вазата.",
  "Благодаря за вниманието към детайла.",
  "Цветовете са невероятни!",
  "Определено ще поръчам пак.",
  "Най-доброто решение за дома.",
  "Вечни цветя - точно както е написано!"
];

const REVIEWS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `${NAMES[i % NAMES.length]} ${String.fromCharCode(65 + (i % 26))}.`,
  text: TEXTS[i % TEXTS.length],
  rating: 5,
}));

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
        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
          <User className="w-4 h-4 text-rose-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
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
