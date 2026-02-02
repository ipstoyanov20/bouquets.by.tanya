import TrustedClients from '@/components/TrustedClients';
import { Star } from 'lucide-react';

const reviews = [
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
  {
    name: 'Никола Г.',
    text: 'Комуникацията беше професионална и доставката навреме. Благодаря!',
    rating: 5,
  },
];

export const metadata = {
  title: 'Отзиви - bouquets.by.tanya',
  description: 'Прочетете истински отзиви от наши клиенти и вижте защо ни се доверяват.',
};

export default function ReviewsPage() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'Organization',
      'name': 'bouquets.by.tanya'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': averageRating,
      'reviewCount': reviews.length
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Отзиви от клиенти</h1>
          <p className="mt-2 text-gray-600">Средна оценка <strong>{averageRating}</strong> от {reviews.length} оценки</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-gray-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-rose-500 mr-1" />
                ))}
                <span className="ml-3 font-semibold">{r.name}</span>
              </div>
              <p className="text-gray-700">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">Ако имате въпрос относно отзивите или искате да споделите опит — свържете се с нас.</p>
        </div>
      </div>
    </div>
  );
}
