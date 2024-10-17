// components/Products.tsx
import React from 'react';
import ProductsTable from './ProductsTable';
import { useProducts } from '../../contexts/ProductsContext';

const Products: React.FC = () => {
  const { productsData, loading, error, refetch } = useProducts();

  const handleAddProduct = async (newProduct: { name: string; price: number }) => {
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleEditProduct = async (id: string, updatedProduct: { name: string; price: number }) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <ProductsTable
        productsData={productsData}
        refetchProducts={refetch}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
  );
};

export default Products;
