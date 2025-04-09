import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import Cart from '../interfaces/cart';
import { useSession } from './sessions_context';

interface CartContextType {
    carts: Cart[];
    loading: boolean;
    error: string | null;
    fetchCarts: () => void;
    addToCartContext: (item: Cart) => void;
    updateCartContext: (updatedItem: Cart) => void;
}

interface CartProviderProps {
    children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { session } = useSession();
    const [carts, setCarts] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCarts = async () => {
        if (!session?.user?.id) {
            setError('User not logged in.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', session.user.id);

            if (error) throw error;

            setCarts(data as Cart[]);
        } catch (err) {
            setError('Failed to fetch cart data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addToCartContext = (item: Cart) => {
        setCarts((prevCarts) => [...prevCarts, item]);
    };

    const updateCartContext = (updatedItem: Cart) => {
        setCarts((prevCarts) =>
            prevCarts.map((item) =>
                item.product_id === updatedItem.product_id
                    ? { ...item, quantity: updatedItem.quantity, price: updatedItem.price }
                    : item
            )
        );
    };


    useEffect(() => {
        if (session?.user?.id) {
            fetchCarts();
        }
    }, [session]);

    return (
        <CartContext.Provider value={{ carts, loading, error, fetchCarts, addToCartContext, updateCartContext }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
