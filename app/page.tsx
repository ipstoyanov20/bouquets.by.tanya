import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { Heart, Shield, Truck } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-rose-50 to-pink-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Вечна красота за <span className="text-rose-600">специални моменти</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
               Изкуствени цветни букети от висококачествени материали Перфектен подарък, който остава вечен <br className="hidden sm:block" /> Носим по Еконт в цялата страна. <img src="/econt-logo.png" alt="Econt Logo" className="inline-block rounded-2xl w-12 sm:w-16 h-auto ml-2 align-middle" />
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">Разгледай букети</Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">Научи повече</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-rose-100 rounded-full mb-3 sm:mb-4">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Ръчна изработка</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Всеки букет е изработен с внимание към детайла и любов
              </p>
            </div>
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-rose-100 rounded-full mb-3 sm:mb-4">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Високо качество</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Използваме само най-качествени материали за дълготрайност
              </p>
            </div>
            <div className="text-center px-4">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-rose-100 rounded-full mb-3 sm:mb-4">
                <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Бърза доставка</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Носим по Еконт - доставяме бързо и сигурно до вашия адрес
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur rounded-full mb-4 sm:mb-6">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Създай своя уникален букет</h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-white/90 leading-relaxed px-2">
                Искаш букет с определени цветове? Специална форма или размер? 
                Ние реализираме твоята визия! Изработваме персонализирани букети 
                точно по твоите желания - избери цветовете, формата и стила.
              </p>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Какво можем да направим за теб:</h3>
                <ul className="space-y-2 text-sm sm:text-base text-white/95">
                  <li className="flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Букети в твоите любими цветове</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Персонализиран размер и форма</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Комбинация от различни видове цветя</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Тематични букети заspecални поводи</span>
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="block">
                <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-gray-100 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 h-auto shadow-lg hover:shadow-xl transition-all">
                  Поръчай персонализиран букет
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Популярни букети</h2>
            <p className="text-sm sm:text-base text-gray-600">Нашите най-харесвани и търсени продукти</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 px-4">
            <Link href="/products" className="block sm:inline-block">
              <Button size="lg" className="w-full sm:w-auto">Виж всички продукти</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Имаш въпроси?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 px-2">
            Свържи се с нас за персонализирани букети и специални поръчки
          </p>
          <Link href="/contact" className="block sm:inline-block px-4">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-gray-100 border-white">
              Свържи се с нас
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
