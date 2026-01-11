import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
}

interface CartState {
    cart: CartItem[];
    orders: Order[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    addOrder: (order: Order) => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            orders: [],
            addToCart: (product) => {
                const { cart } = get();
                const existingItem = cart.find((item) => item.id === product.id);
                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },
            removeFromCart: (productId) => {
                set({ cart: get().cart.filter((item) => item.id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set({
                    cart: get().cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ cart: [] }),
            addOrder: (order) => set({ orders: [order, ...get().orders] }),
            totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'shopping-cart',
        }
    )
);
