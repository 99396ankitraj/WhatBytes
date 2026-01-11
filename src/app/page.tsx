import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams.category as string;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : 1000;
  const query = (searchParams.q as string) || '';

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !category || category === 'All' || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    const matchesQuery =
      !query || product.title.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesPrice && matchesQuery;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8 animate-in fade-in duration-500">
      <Sidebar />

      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0f4c81]">Product Listing</h2>
          <span className="text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
            {filteredProducts.length} Items
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-900 font-medium text-lg">No products found</p>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
            <Link href="/" className="px-6 py-2 bg-[#0f4c81] text-white rounded-lg hover:bg-[#0b3a62] transition-colors">
              Clear All Filters
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
