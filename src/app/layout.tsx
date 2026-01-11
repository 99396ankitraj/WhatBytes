import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Whatbytes Shop',
  description: 'Frontend Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 md:px-6 flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
