export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating?: number;
    reviews?: number;
}

export const products: Product[] = [
    {
        id: 1,
        title: "Running Shoes",
        price: 99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Clothing",
        description: "High-performance running shoes designed for comfort and speed. featuring breathable mesh and cushioned sole.",
        rating: 4.5,
        reviews: 12
    },
    {
        id: 2,
        title: "Wireless Headphones",
        price: 149,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.",
        rating: 4.8,
        reviews: 45
    },
    {
        id: 3,
        title: "Backpack",
        price: 129,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Accessories",
        description: "Durable and spacious backpack, perfect for travel or daily commute. Water-resistant material.",
        rating: 4.6,
        reviews: 23
    },
    {
        id: 4,
        title: "Smartwatch",
        price: 249,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        description: "Stay connected with this feature-packed smartwatch. Tracks fitness, heart rate, and notifications.",
        rating: 4.2,
        reviews: 8
    },
    {
        id: 5,
        title: "Sunglasses",
        price: 149,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Accessories",
        description: "Classic aviator sunglasses with polarized lenses for maximum UV protection.",
        rating: 4.7,
        reviews: 30
    },
    {
        id: 6,
        title: "Digital Camera",
        price: 499,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        description: "Professional grade digital camera with 24MP sensor and 4k video recording capabilities.",
        rating: 4.9,
        reviews: 55
    },
    {
        id: 7,
        title: "T-shirt",
        price: 29,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Clothing",
        description: "Soft cotton t-shirt available in multiple colors. Comfortable fit for everyday wear.",
        rating: 4.3,
        reviews: 15
    },
    {
        id: 8,
        title: "Smartphone",
        price: 699,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Electronics",
        description: "Latest flagship smartphone with stunning display, powerful processor, and all-day battery life.",
        rating: 4.8,
        reviews: 120
    }
];
