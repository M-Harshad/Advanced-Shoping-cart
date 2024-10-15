import { useState, useEffect } from 'react';

// Define the structure of an item in the cart
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number; // Add quantity property here
}

// Define the structure of the cart
interface Cart {
    totalAmt: number;
    carItems: CartItem[];
}

const useCart = () => {
    const [cart, setCart] = useState<Cart>({ totalAmt: 0, carItems: [] });

    // Function to fetch the current cart from the JSON server
    const fetchCart = async () => {
        try {
            const response = await fetch('http://localhost:3000/cart/1'); // Adjust based on your cart ID
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Call fetchCart once on mount
    useEffect(() => {
        fetchCart();
    }, [cart]);

    // Function to get the quantity of a specific item
    const getItemQuantity = (id: number) => {
        return cart.carItems.find(item => item.id === id)?.quantity || 0;
    };

    // Function to increase item quantity in the cart
    const increaseItemQuantity = async (id: number, price: number) => {
        try {
            const response = await fetch('http://localhost:3000/cart/1');
            const cartData = await response.json();

            const existingItem = cartData.carItems.find(item => item.id === id);

            let updatedItems;
            if (!existingItem) {
                updatedItems = [
                    ...cartData.carItems,
                    { id, name: `Item ${id}`, price: price, quantity: 1 }
                ];
            } else {
                updatedItems = cartData.carItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            const updatedCart = {
                ...cartData,
                totalAmt: cartData.totalAmt + price,
                carItems: updatedItems
            };

            const updateResponse = await fetch('http://localhost:3000/cart/1', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCart)
            });

            if (updateResponse.ok) {
                setCart(updatedCart);
                console.log('Cart updated successfully');
            } else {
                console.error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // Function to decrease item quantity in the cart
    const decreaseItemQuantity = async (id: number) => {
        try {
            // Fetch the current cart data from the JSON server
            const response = await fetch('http://localhost:3000/cart/1'); // Adjust the cart ID as needed
            const cartData = await response.json();
    
            const existingItem = cartData.carItems.find(item => item.id === id);
            if (!existingItem) return; // Item not found, exit
    
            let updatedItems;
    
            if (existingItem.quantity === 1) {
                // If the quantity is 1, remove the item from the cart
                updatedItems = cartData.carItems.filter(item => item.id !== id);
            } else {
                // Decrease the quantity of the item
                updatedItems = cartData.carItems.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
    
            // Calculate the new total amount
            const updatedTotalAmt = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
            // Create the updated cart object
            const updatedCart = {
                ...cartData,
                carItems: updatedItems,
                totalAmt: updatedTotalAmt,
            };
    
            // Send the updated cart back to the JSON server
            const updateResponse = await fetch('http://localhost:3000/cart/1', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCart),
            });
    
            if (updateResponse.ok) {
                // Update local state only if the update was successful
                setCart(updatedCart);
                console.log('Cart updated successfully');
            } else {
                console.error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
    

    // Function to remove an item from the cart
    const removeItem = async (id: number) => {
        try {
            // Fetch the current cart data from the JSON server
            const response = await fetch('http://localhost:3000/cart/1'); // Adjust the cart ID as needed
            const cartData = await response.json();
    
            // Filter out the item to be removed
            const updatedItems = cartData.carItems.filter(item => item.id !== id);
            const removedItem = cartData.carItems.find(item => item.id === id);
            
            // Calculate the new total amount
            const updatedTotalAmt = cartData.totalAmt - (removedItem ? removedItem.price * removedItem.quantity : 0);
    
            // Create the updated cart object
            const updatedCart = {
                ...cartData,
                carItems: updatedItems,
                totalAmt: updatedTotalAmt,
            };
    
            // Send the updated cart back to the JSON server
            const updateResponse = await fetch('http://localhost:3000/cart/1', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCart),
            });
    
            if (updateResponse.ok) {
                // Update local state only if the update was successful
                setCart(updatedCart);
                console.log('Item removed successfully');
            } else {
                console.error('Failed to update cart');
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
    

    // Calculate total quantity and total amount
    const cartQuantity = cart.carItems.reduce((quantity, item) => quantity + item.quantity, 0);
    const totalAmount = cart.carItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
        cart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        cartQuantity,
        totalAmount
    };
};

export default useCart;
