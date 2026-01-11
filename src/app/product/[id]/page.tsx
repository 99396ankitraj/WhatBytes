import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = products.find((p) => p.id === Number(params.id));

    if (!product) {
        notFound();
    }

    return (
        <div className="py-8 animate-in zoom-in-95 duration-500">
            <ProductDetail product={product} />
        </div>
    );
}
