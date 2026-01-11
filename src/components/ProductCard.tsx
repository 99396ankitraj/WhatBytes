'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Star } from 'lucide-react';
// Basic visual feedback implemented manually

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating if wrapped in Link (but here button is separate)
        addToCart(product);
        // Basic feedback
        const btn = e.currentTarget as HTMLButtonElement;
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        setTimeout(() => btn.innerText = originalText, 1000);
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start border border-gray-100 group">
            {/* Clickable Card Area */}
            <Link href={`/product/${product.id}`} className="w-full">
                <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#0f4c81] transition-colors">
                    {product.title}
                </h3>
            </Link>

            <div className="w-full flex items-center justify-between mb-2">
                <div className="text-gray-900 font-bold text-lg">${product.price}</div>
                {product.rating && (
                    <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-gray-500">{product.rating}</span>
                    </div>
                )}
            </div>

            {/* Subtitle / Description excerpt if needed? No, image doesn't show description on card */}

            <button
                onClick={handleAdd}
                className="w-full bg-[#0f4c81] hover:bg-[#0b3a62] text-white py-2.5 rounded-lg font-medium text-sm transition-colors mt-auto flex items-center justify-center gap-2"
            >
                Add to Cart
            </button>
        </div>
    )
}
