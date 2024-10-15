import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import ShoppingCart from "../components/ShopingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type CartItem = {
    id: number;
    name: string; // Add item name for display
    price: number; // Price per item
    quantity: number;
};

type JsonData = {
    name: string
    id: number
    price: number
    photo: string
};

type ShoppingCartContextProps = {

    jsonData: JsonData[]; 
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
    const [jsonData, setJsonData] = useState<JsonData[]>([]);

    const fetchCartItems = async () => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setJsonData(data);
    }

    useEffect(() => {
        fetchCartItems();
    }, []);


    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    

    return (
        <ShoppingCartContext.Provider value={{
            jsonData,
            openCart,
            closeCart,
            isOpen,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    );
}
