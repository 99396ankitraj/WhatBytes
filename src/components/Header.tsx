'use client';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function HeaderContent() {
    const totalItems = useCartStore((state) => state.totalItems());
    const orders = useCartStore((state) => state.orders);
    const [search, setSearch] = useState('');
    const [showOrders, setShowOrders] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Sync search input with URL 'q'
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearch(q);
    }, [searchParams]);


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
            params.set('q', search);
        } else {
            params.delete('q');
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <header className="bg-[#0f4c81] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Logo
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-10 pr-4 py-2 rounded bg-[#1e5c93] border border-blue-400 focus:outline-none focus:border-white placeholder-gray-300 text-sm text-white transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/cart">
                        <div className="relative cursor-pointer">
                            <div className="bg-[#001f3f] hover:bg-[#003366] text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors">
                                <ShoppingCart className="w-4 h-4" />
                                <span>Cart</span>
                            </div>
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0f4c81]">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </Link>
                    {/* Profile & Orders Popover */}
                    <div className="relative">
                        <button
                            onClick={() => setShowOrders(!showOrders)}
                            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors focus:ring-2 focus:ring-white/50"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        {showOrders && (
                            <>
                                <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setShowOrders(false)} />
                                <div className="absolute right-0 top-full mt-3 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 text-gray-900 animate-in fade-in zoom-in-95 duration-200">
                                    <h3 className="font-bold text-lg mb-4 text-[#0f4c81] border-b pb-2 flex justify-between items-center">
                                        Your Orders
                                        <span className="text-xs bg-blue-50 text-[#0f4c81] px-2 py-1 rounded-full">{orders.length}</span>
                                    </h3>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 text-sm">
                                            No past orders found.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <span className="font-bold text-gray-900 block">{order.id}</span>
                                                            <span className="text-xs text-gray-500">{order.date}</span>
                                                        </div>
                                                        <span className="font-bold text-[#0f4c81]">${order.total.toFixed(2)}</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {order.items.map((item) => (
                                                            <div key={item.id} className="flex justify-between text-xs text-gray-600">
                                                                <span className="truncate max-w-[150px]">{item.title}</span>
                                                                <span>x{item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile Search */}
            <div className="container mx-auto mt-4 px-6 md:hidden">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded bg-[#1e5c93] border border-blue-400 text-white placeholder-gray-300 focus:outline-none focus:border-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
        </header>
    );
}

export default function Header() {
    return (
        <Suspense fallback={<header className="bg-[#0f4c81] h-[72px] sticky top-0 z-50"></header>}>
            <HeaderContent />
        </Suspense>
    )
}
