import React, { createContext, useContext, useState, ReactNode } from "react";
import ShoppingCart from "../components/ShopingCart";

type CartItem = {
    id: number;
    name: string; // Add item name for display
    price: number; // Price per item
    quantity: number;
};

type ShoppingCartContextProps = {
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number, price: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeItem: (id: number) => void;
    cartItems: CartItem[];
    cartQuantity: number;
    totalAmount: number; // Total amount calculation
    openCart: () => void;
    closeCart: () => void;
    isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
    console.log(cartItems)
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };

    const increaseItemQuantity = (id: number, price: number) => {
        setCartItems(cartItems => {
            const existingItem = cartItems.find(item => item.id === id);
            if (!existingItem) {
                return [...cartItems, { id, name: `Item ${id}`, price: price , quantity: 1 }];
            } else {
                return cartItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    };

    const decreaseItemQuantity = (id: number) => {
        setCartItems(cartItems => {
            const existingItem = cartItems.find(item => item.id === id);
            if (!existingItem) return cartItems;

            if (existingItem.quantity === 1) {
                return cartItems.filter(item => item.id !== id);
            } else {
                return cartItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems => cartItems.filter(item => item.id !== id));
    };

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeItem,
            cartItems,
            cartQuantity,
            totalAmount,
            openCart,
            closeCart,
            isOpen,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    );
}
