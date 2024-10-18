import ProductsTable from '../../../components/dashboard/Products/ProductsTable';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {};

export default function Products({}: Props) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProductsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch
  }, []);

  const onDeleteProduct = async (id: string) => {
    try {
      // Delete the product from the products API
      const productResponse = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });

      // Check if the product deletion was successful
      if (!productResponse.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the item from the cart
      await removeItem(id); // Call the removeItem function

      // Refresh products after deletion
      fetchProducts(); // Call the function to refresh products
    } catch (error) {
      console.error('Error during product deletion:', error);
      // Optionally show a message to the user
    }
  };

  const removeItem = async (id: string) => {
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
        // Optionally update local state if necessary
        console.log('Item removed from cart successfully');
      } else {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ProductsTable
        productsData={productsData}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
  );
}
