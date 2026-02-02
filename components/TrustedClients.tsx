import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Мария П.',
    text: 'Букетът беше невероятно красив, пристигна в перфектно състояние и направи празника специален.',
    rating: 5,
  },
  {
    name: 'Иван Д.',
    text: 'Бързо обслужване и отлично качество. Препоръчвам на всички, които търсят стилен подарък.',
    rating: 5,
  },
  {
    name: 'Александра К.',
    text: 'Изключително внимание към детайла. Много съм доволна от покупката.',
    rating: 5,
  },
];

export default function TrustedClients() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Доверени от щастливи клиенти</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Гордеем се с доверието на нашите клиенти — качествени продукти, внимателно обслужване и бърза доставка.
          </p>
        </div>

        {/* Logos / trust badges */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
          <div className="px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
            <Image src="/econt-logo.png" alt="Econt" width={140} height={36} />
          </div>

          <div className="px-4 py-2 bg-rose-50 rounded-lg shadow-sm text-rose-600 font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.945c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.351 2.846c-.785.57-1.84-.197-1.54-1.118l1.287-3.945a1 1 0 00-.364-1.118L2.67 9.372c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
            <span>Средна оценка 5.0 (100+ отзива)</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-rose-500 mr-1" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed">“{t.text}”</blockquote>
              <div className="mt-4 text-sm font-semibold text-gray-900">{t.name}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/reviews" className="inline-block">
            <button className="px-6 py-2 rounded-md border border-rose-600 text-rose-600 hover:bg-rose-50 transition">
              Виж повече отзиви
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
