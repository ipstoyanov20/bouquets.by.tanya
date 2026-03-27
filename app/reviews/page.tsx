'use client';

import { motion } from 'framer-motion';
import { Star, User, Heart, MessageCircle } from 'lucide-react';

const NAMES = ["Георги", "Мария", "Иван", "Елена", "Димитър", "Десислава", "Николай", "Петя", "Стефан", "Анна", "Борис", "Милен", "Снежина", "Александър", "Мирослава"];
const TEXTS = [
  "Най-красивите букети, които съм поръчвал! Изкуствените цветя изглеждат невероятно реалистично и носят свежест в дома ми постоянно.",
  "Изключително реалистично изпълнение. Дори отблизо е трудно да се повярва, че не са истински. Препоръчвам горещо!",
  "Бърза и точна доставка с Еконт. Букетът беше опакован перфектно и пристигна в безупречно състояние.",
  "Перфектен подарък за рожден ден. Жена ми беше очарована от детайлите и цветовете на розите.",
  "Много съм доволна от качеството. Вече 6 месеца изглеждат като нови. Спестяват ми много време и пари за нови цветя всяка седмица.",
  "Страхотно обслужване! Екипът беше много любезен при уточняване на детайлите за моята индивидуална поръчка.",
  "Букетът стои страхотно във вазата в дневната ни. Получавам комплименти от всеки гост, който ни посети.",
  "Благодаря за вниманието към детайла и за това, че направихте празника ни още по-специален с тези красиви цветя.",
  "Цветовете са невероятни! Комбинацията от рози и зеленина е направена с много вкус и артистичност.",
  "Определено ще поръчам пак. Това е най-доброто решение за интериорна декорация, което съм откривала.",
  "Най-доброто решение за дома. Няма нужда от поливане и грижи, а красотата е вечна.",
  "Вечни цветя - точно както е написано! Истинско изкуство в бутикова форма."
];

const REVIEWS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `${NAMES[i % NAMES.length]} ${String.fromCharCode(65 + (i % 26))}.`,
  text: TEXTS[i % TEXTS.length],
  rating: 5,
  date: `${Math.floor(Math.random() * 28) + 1} ${['ян', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'][Math.floor(Math.random() * 12)]} 2024`,
}));

export default function ReviewsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold mb-6">
              <Heart className="w-4 h-4 fill-rose-600" />
              <span>Над 100 доволни клиента</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Какво казват <span className="text-rose-600">нашите клиенти</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Вашето мнение е най-голямото признание за труда и любовта, които влагаме във всеки букет.
            </p>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      </section>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-1/2 z-20 relative">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="text-4xl font-extrabold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">4.9/5</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Средна оценка</p>
          </div>
          <div className="text-center md:border-x border-slate-100 group">
            <div className="text-4xl font-extrabold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">100%</div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Ръчна изработка</p>
            <p className="text-xs text-rose-500 font-bold italic">Всеки детайл е важен</p>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-extrabold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">100+</div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Реални отзива</p>
            <p className="text-xs text-slate-400">от верифицирани клиенти</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
              className="break-inside-avoid bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 hover:border-rose-100 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                    <User className="w-6 h-6 text-slate-400 group-hover:text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{review.name}</h3>
                    <p className="text-xs text-slate-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <MessageCircle className="absolute -top-1 -left-1 w-8 h-8 text-rose-100 -z-10 opacity-50" />
                <p className="text-slate-600 leading-relaxed text-sm italic">
                  "{review.text}"
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Потвърдена покупка</span>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-16 text-center text-white px-4">
        <h2 className="text-3xl font-bold mb-6">Готови ли сте за Вашия букет?</h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href="/products"
            className="inline-block py-4 px-10 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-lg shadow-rose-900/40 transition-all"
          >
            Разгледай Колекцията
          </a>
        </motion.div>
      </section>
    </div>
  );
}
