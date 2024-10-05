import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import ShoppingCart from "../components/ShopingCart";

type ShopingCartproviderprops ={
    children: ReactNode
}
type CartItem = {
   id: number
   Quantity: number
}
type shopingcartcontextprops = {
    getItemQuantity: (id: number) => number
    IncItemQuantity: (id: number) => void
    decItemQuantity: (id: number) => void
    RemoveItem: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    openCart: any
    closeCart: any
    isOpen: boolean
 }

const shopingcartcontext = createContext({} as
    shopingcartcontextprops);

export function useshopingCart() {
    return useContext(shopingcartcontext)
}

export function ShopingCartprovider({ children }: 
    ShopingCartproviderprops) {

    const [isOpen , setIsOpen] = useState(false)
    const [cartItems, SetCartItem] =useState<CartItem[]>([])


    const cartQuantity = cartItems.reduce(
        (Quantity , item) => item.Quantity + Quantity, 0)


    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id )?.Quantity || 0
    };

    function IncItemQuantity(id: number) {
        SetCartItem( cartItems => {
            if(cartItems.find(item => item.id === id) == null){
                return [...cartItems, {id: id, Quantity: 1}]
            } else {
                return cartItems.map(item => {
                    if(item.id === id){
                        return { ...item , Quantity: item.Quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    };

    function decItemQuantity(id: number) {
        SetCartItem( cartItems => {
            if(cartItems.find(item => item.id === id)?.Quantity == 1){
                return cartItems.filter(item => item.id !== id)
            } else {
                return cartItems.map(item => {
                    if(item.id === id){
                        return { ...item , Quantity: item.Quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    };

    function RemoveItem(id: number){
         SetCartItem(cartItems => {
           return cartItems.filter(item => item.id !== id)
        })
    };




  return(
    <shopingcartcontext.Provider value={
        {getItemQuantity,
        IncItemQuantity,
        decItemQuantity,
        RemoveItem,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen}
        } >
    {children}
    <ShoppingCart isOpen={isOpen}/>
    </shopingcartcontext.Provider>
  )
}