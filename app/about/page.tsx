import { Heart, Target, Award } from 'lucide-react';

export const metadata = {
  title: 'За нас - bouquets.by.tanya',
  description: 'Научете повече за нашата история и мисия',
};

export default function AboutPage() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">За нас</h1>
          <p className="text-xl text-gray-600">
            Създаваме вечна красота с любов и внимание към детайла
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed mb-4">
            Добре дошли в <strong>bouquets.by.tanya</strong> – вашето място за изкуствени цветни букети,
            които донасят красота и елегантност в живота ви.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Нашата история започва с любовта към цветята и желанието да създадем нещо специално –
            букети, които не вехнат, но запазват своята красота и чар завинаги. Всеки букет е
            ръчно изработен с внимание към най-малките детайли, използвайки само висококачествени
            материали, които гарантират реалистичен вид и дълготрайност.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Вярваме, че цветята са повече от подарък – те са изразяване на емоции, споделяне на
            специални моменти и създаване на спомени. Затова всеки наш букет е създаден с любов
            и грижа, за да донесе радост и усмивка на вашите любими хора.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Страст</h3>
            <p className="text-gray-600">
              Създаваме всеки букет с любов и отдаденост към изкуството
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Качество</h3>
            <p className="text-gray-600">
              Използваме само най-добрите материали за перфектен резултат
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <Target className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Внимание</h3>
            <p className="text-gray-600">
              Всеки детайл е важен за нас и нашите клиенти
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-rose-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Нашата мисия</h2>
          <p className="text-gray-700 leading-relaxed">
            Да направим красотата достъпна и вечна, като предлагаме изкуствени цветни букети
            от най-високо качество. Искаме всеки наш клиент да се почувства специален и да
            донесе радост на своите близки с нашите уникални творения.
          </p>
        </div>
      </div>
    </div>
  );
}
