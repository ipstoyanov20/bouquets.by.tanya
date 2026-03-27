import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { AnimatedReviews } from "@/components/AnimatedReviews";
import { Heart, Shield, Truck } from "lucide-react";
import TrustedClients from "@/components/TrustedClients";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-50/50 pt-16 sm:pt-20 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
              Бутикова красота за <span className="text-rose-600 block sm:inline">специални моменти</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
               Изкуствени цветни букети от висококачествени материали. Перфектен подарък, който остава вечен. <br className="hidden sm:block" /> 
               <span className="text-green-600 font-bold">БЕЗПЛАТНА ДОСТАВКА</span> с Еконт в цялата страна 
               <img src="/econt-logo.png" alt="Econt Logo" className="inline-block rounded-2xl w-14 sm:w-18 h-auto ml-3 align-middle hover:scale-110 transition-transform" />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-6">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-80 h-16 text-lg rounded-2xl bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-200 transition-all active:scale-95">
                  Разгледай букети
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-60 h-16 text-lg rounded-2xl border-rose-200 hover:bg-rose-50 text-rose-600">
                  Научи повече
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Reviews Section */}
        <AnimatedReviews />
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Безплатна доставка</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Доставката се поема от нас! Изпращаме с Еконт бързо и сигурно.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustedClients />

      {/* Custom Orders Section */}
      <section className="py-12 sm:py-16 bg-linear-to-br from-rose-500 via-rose-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur rounded-full mb-4 sm:mb-6">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Поръчай персонализиран букет
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">
                Избери букет и персонализирай броя рози според твоите предпочитания
              </p>
              <Link href="/products">
                <Button size="lg" variant="outline" className="bg-white text-rose-600 hover:bg-gray-50 border-white">
                  Разгледай букетите
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
