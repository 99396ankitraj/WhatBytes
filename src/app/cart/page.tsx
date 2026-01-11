'use client';
import { useCartStore } from '@/store/cartStore';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart, addOrder } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [lastOrder, setLastOrder] = useState<{ items: typeof cart, total: number, date: string, id: string } | null>(null);

    useEffect(() => setMounted(true), []);

    const handleCheckout = () => {
        const newOrder = {
            id: `#WB-${Math.floor(Math.random() * 100000)}`,
            items: [...cart],
            total: totalPrice(),
            date: new Date().toLocaleString()
        };

        setLastOrder(newOrder);
        addOrder(newOrder);
        clearCart();
        setOrderSuccess(true);
        window.scrollTo(0, 0);
    };

    if (!mounted) return null;

    if (orderSuccess && lastOrder) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 animate-in theme-zoom-in duration-500">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-green-50 p-8 flex flex-col items-center justify-center text-center border-b border-green-100">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
                        <p className="text-gray-600">Thank you for your purchase. Here is your receipt.</p>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-8 text-sm text-gray-500">
                            <div>
                                <p className="font-semibold text-gray-900">Order Date</p>
                                <p>{lastOrder.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">Order ID</p>
                                <p>#WB-{Math.floor(Math.random() * 100000)}</p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-900 font-semibold border-b">
                                    <tr>
                                        <th className="p-4">Item</th>
                                        <th className="p-4 text-center">Qty</th>
                                        <th className="p-4 text-right">Price</th>
                                        <th className="p-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {lastOrder.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{item.title}</div>
                                                <div className="text-gray-500 text-xs">{item.category}</div>
                                            </td>
                                            <td className="p-4 text-center">{item.quantity}</td>
                                            <td className="p-4 text-right">${item.price}</td>
                                            <td className="p-4 text-right font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mb-8">
                            <div className="w-full sm:w-1/2 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${lastOrder.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (0%)</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <div className="flex justify-between text-xl font-bold text-[#0f4c81]">
                                    <span>Total Paid</span>
                                    <span>${lastOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => {
                                    setOrderSuccess(false);
                                    setLastOrder(null);
                                }}
                                className="inline-flex items-center gap-2 text-[#0f4c81] font-semibold hover:underline"
                            >
                                <ArrowLeft className="w-4 h-4" /> Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-10 h-10 text-[#0f4c81]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our products and find something you love!</p>
                <Link href="/" className="px-8 py-3 bg-[#0f4c81] text-white rounded-lg font-medium hover:bg-[#0b3a62] transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="py-8 animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-[#0f4c81] mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                            <Link href={`/product/${item.id}`} className="block w-24 h-24 relative bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
                                <Image src={item.image} alt={item.title} fill className="object-contain p-2 hover:scale-105 transition-transform" />
                            </Link>

                            <div className="flex-1 min-w-0">
                                <Link href={`/product/${item.id}`} className="font-semibold text-gray-900 truncate hover:text-[#0f4c81] text-lg block">
                                    {item.title}
                                </Link>
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                <div className="font-bold text-[#0f4c81] text-lg">${item.price}</div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 hover:text-[#0f4c81] transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 hover:text-[#0f4c81] transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full hover:bg-red-50"
                                    title="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="font-bold text-lg text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping estimate</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="h-px bg-gray-100 my-2"></div>
                            <div className="flex justify-between text-gray-900 font-bold text-xl">
                                <span>Total</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#0f4c81] hover:bg-[#0b3a62] text-white py-3.5 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/10"
                        >
                            Checkout <ArrowRight className="w-5 h-5" />
                        </button>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-sm text-gray-500 hover:text-[#0f4c81] hover:underline flex items-center justify-center gap-1">
                                <ArrowLeft className="w-3 h-3" /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
