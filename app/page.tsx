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
      <section className="bg-linear-to-r from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Вечна красота за <span className="text-rose-600">специални моменти</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Изкуствени цветни букети от висококачествени материали. Перфектен подарък, който остава вечен.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg">Разгледай букети</Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">Научи повече</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ръчна изработка</h3>
              <p className="text-gray-600">
                Всеки букет е изработен с внимание към детайла и любов
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Високо качество</h3>
              <p className="text-gray-600">
                Използваме само най-качествени материали за дълготрайност
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Бърза доставка</h3>
              <p className="text-gray-600">
                Доставяме бързо и сигурно до вашия адрес
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярни букети</h2>
            <p className="text-gray-600">Нашите най-харесвани и търсени продукти</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg">Виж всички продукти</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Имаш въпроси?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свържи се с нас за персонализирани букети и специални поръчки
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-white text-rose-600 hover:bg-gray-100 border-white">
              Свържи се с нас
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
