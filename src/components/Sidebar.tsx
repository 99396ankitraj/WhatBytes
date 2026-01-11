'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { ChevronRight } from 'lucide-react';

const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home'];

function SidebarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial state from URL
    const initialCategory = searchParams.get('category') || 'All';
    const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1000;

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(initialMaxPrice);

    // Sync state with URL if URL changes externally
    useEffect(() => {
        const cat = searchParams.get('category') || 'All';
        const price = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 1000;
        setSelectedCategory(cat);
        setPriceRange(price);
    }, [searchParams]);

    const updateFilters = (category: string, price: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category && category !== 'All') {
            params.set('category', category);
        } else {
            params.delete('category');
        }

        params.set('maxPrice', price.toString());

        router.push(`/?${params.toString()}`);
    };

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        updateFilters(cat, priceRange);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceRange(Number(e.target.value));
    };

    const handlePriceCommit = () => {
        updateFilters(selectedCategory, priceRange);
    };

    return (
        <div className="w-full md:w-64 shrink-0 space-y-6">
            {/* Blue Card */}
            <div className="bg-[#0f4c81] text-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Filters</h2>

                {/* Category Section */}
                <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4">Category</h3>
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-white' : 'border-gray-400 group-hover:border-white'}`}>
                                    {selectedCategory === cat && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                </div>
                                <input
                                    type="radio"
                                    name="category_dark"
                                    checked={selectedCategory === cat}
                                    onChange={() => handleCategoryChange(cat)}
                                    className="hidden"
                                />
                                <span className={`text-sm ${selectedCategory === cat ? 'font-semibold text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Section */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Price</h3>
                    <div className="px-1">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={priceRange}
                            onChange={handlePriceChange}
                            onMouseUp={handlePriceCommit}
                            onTouchEnd={handlePriceCommit}
                            className="w-full h-1.5 bg-gray-400/50 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                        <div className="flex justify-between text-xs font-medium text-gray-300 mt-2">
                            <span>0</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* White Card (Visual duplicate/Second filter as per mockup) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cacyroy</h2>

                {/* Visual duplicate of categories as shown in mockup */}
                <div className="mb-8">
                    <div className="space-y-3">
                        {['All', 'Electronics', 'Clothing', 'Home'].map((item, idx) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${idx === 0 ? 'border-[#0f4c81]' : 'border-gray-300 group-hover:border-[#0f4c81]'}`}>
                                    {idx === 0 && <div className="w-2.5 h-2.5 rounded-full bg-[#0f4c81]" />}
                                </div>
                                <input type="radio" name="cacyroy" className="hidden" />
                                <span className={`text-sm ${idx === 0 ? 'font-semibold text-[#0f4c81]' : 'text-gray-600 group-hover:text-[#0f4c81]'}`}>
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Price</h3>
                    <div className="relative">
                        <input
                            type="text"
                            defaultValue="5000"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-[#0f4c81] font-medium"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0f4c81]">
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Sidebar() {
    return (
        <Suspense fallback={<div className="w-full h-96 bg-gray-100 rounded-xl animate-pulse"></div>}>
            <SidebarContent />
        </Suspense>
    )
}
