// components/ProductsTable.tsx
import { Table, Button } from 'antd';
import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
    productsData: Product[];
    refetchProducts: () => Promise<void>;
    onAddProduct: (newProduct: { name: string; price: number }) => Promise<void>;
    onEditProduct: (id: string, updatedProduct: { name: string; price: number }) => Promise<void>;
    onDeleteProduct: (id: string) => Promise<void>; // This should match the type
  };

  
  
  const ProductsTable: React.FC<Props> = ({
      productsData,
      refetchProducts,
      onAddProduct,
      onEditProduct,
      onDeleteProduct,
    }) => {
        const handleAddProduct = async () => {
            const newProduct = { name: 'New Product', price: 0 }; // Replace with actual input
            await onAddProduct(newProduct);
            await refetchProducts(); // Refetch after adding
        };
        
        const handleEditProduct = async (id: string) => {
            const updatedProduct = { name: 'Updated Product', price: 20 }; // Replace with actual input
            await onEditProduct(id, updatedProduct);
            await refetchProducts(); // Refetch after editing
        };
        
        const handleDeleteProduct = async (id: string) => {
            console.log('Deleting product with ID:', id); 
            await onDeleteProduct(id);
            await refetchProducts(); // Refetch after deleting
        };
        
        console.log('onDeleteProduct:', onDeleteProduct);
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        // Check if price is a number
        return typeof price === 'number' ? `$${price.toFixed(2)}` : '$0.00';
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEditProduct(record.id)}>Edit</Button>
          <span style={{ margin: '0 8px' }}>|</span>
          <Button onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleAddProduct} type="primary" style={{ marginBottom: 16 }}>
        Add New Product
      </Button>
      <Table
        dataSource={productsData.map(product => ({ ...product, key: product.id }))}
        columns={columns}
      />
    </div>
  );
};

export default ProductsTable;
