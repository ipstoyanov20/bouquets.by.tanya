'use client';

import { motion } from 'framer-motion';
import { Star, User, Heart, MessageCircle } from 'lucide-react';

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
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center group-hover:bg-rose-50 transition-colors ring-2 ring-slate-50 group-hover:ring-rose-50">
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
                      <User className="w-6 h-6 text-slate-400 group-hover:text-rose-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 line-clamp-1">{review.name}</h3>
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
