// context/ProductsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductsContextType = {
  productsData: Product[];
  onAddProduct: (newProduct: { name: string; price: number }) => Promise<void>;
  onEditProduct: (id: string, updatedProduct: { name: string; price: number }) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const onAddProduct = async (newProduct: { name: string; price: number }) => {
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    fetchProducts(); // Refresh products after adding
  };

  const onEditProduct = async (id: string, updatedProduct: { name: string; price: number }) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    fetchProducts(); // Refresh products after editing
  };

  const onDeleteProduct = async (id: string) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts(); // Refresh products after deletion
  };

  return (
    <ProductsContext.Provider value={{ productsData, loading, error, onAddProduct, onEditProduct, onDeleteProduct, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
