'use client';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const state = useCartStore.getState();
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
            state.updateQuantity(product.id, existingItem.quantity + quantity);
        } else {
            state.addToCart(product); // Adds 1
            if (quantity > 1) {
                state.updateQuantity(product.id, quantity);
            }
        }
        alert("Added to cart!");
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Left: Image */}
                <div className="w-full md:w-1/2 bg-gray-50 rounded-xl flex items-center justify-center p-8 relative min-h-[400px]">
                    <Link href="/" className="absolute top-4 left-4 z-10 text-gray-500 hover:text-[#0f4c81] flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <div className="relative w-full h-full min-h-[300px]">
                        <Image src={product.image} alt={product.title} fill className="object-contain mix-blend-multiply" />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div>
                        <span className="text-sm font-semibold text-[#0f4c81] uppercase tracking-wider">{product.category}</span>
                        <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-semibold text-gray-900">{product.rating}</span>
                            </div>
                            <span className="text-gray-400 text-sm">|</span>
                            <span className="text-gray-500 text-sm">{product.reviews} Reviews</span>
                        </div>
                    </div>

                    <div className="text-4xl font-bold text-[#0f4c81]">${product.price}</div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                        <br /><br />
                        Experience premium quality with this {product.title.toLowerCase()}. Designed for modern life, it combines style and functionality perfectly.
                    </p>

                    <div className="pt-6 border-t border-gray-100">
                        <label className="text-sm font-semibold text-gray-900 mb-3 block">Quantity</label>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-gray-600" />
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#0f4c81] hover:bg-[#0b3a62] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/10"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
