import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#001f3f] text-white py-12 mt-auto">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="font-bold text-lg mb-4">Filters</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer">All Products</li>
                        <li className="hover:text-white cursor-pointer">Electronics</li>
                        <li className="hover:text-white cursor-pointer">Clothing</li>
                        <li className="hover:text-white cursor-pointer">Home & Living</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">About Us</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer">Our Story</li>
                        <li className="hover:text-white cursor-pointer">Contact Us</li>
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms of Service</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-transform hover:scale-110">
                            <Facebook className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-400 transition-transform hover:scale-110">
                            <Twitter className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 transition-transform hover:scale-110">
                            <Instagram className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-10 pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                <span>© 2024 Whatbytes Assignment. All rights reserved.</span>
                <span className="text-xs">Designed for assignment</span>
            </div>
        </footer>
    );
}
