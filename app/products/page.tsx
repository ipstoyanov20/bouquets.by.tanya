import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata = {
  title: "Продукти - bouquets.by.tanya",
  description: "Разгледайте нашата колекция от изкуствени цветни букети",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Нашите букети</h1>
          <p className="text-lg text-gray-600">
            Разгледайте цялата ни колекция от изкуствени цветни букети
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Няма налични продукти в момента.</p>
          </div>
        )}
      </div>
    </div>
  );
}
