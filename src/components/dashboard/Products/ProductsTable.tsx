// components/ProductsTable.tsx
import { Table, Button } from 'antd';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
    productsData: Product[];
    onDeleteProduct: (id: string) => Promise<void>; // This should match the type
  };

  
  
  const ProductsTable: React.FC<Props> = ({
      productsData,
      onDeleteProduct,
    }) => {

      const navigate = useNavigate()

        const handleDeleteProduct = async (id: string) => {
            await onDeleteProduct(id);
        };
        
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
          <Button onClick={() => navigate(`/dashboard/products/update/${record.id}`)}>Edit</Button>
          <span style={{ margin: '0 8px' }}>|</span>
          <Button onClick={() => handleDeleteProduct(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <NavLink to="/dashboard/products/create">
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add New Product
      </Button>
      </NavLink>
      <Table
        dataSource={productsData.map(product => ({ ...product, key: product.id }))}
        columns={columns}
      />
    </div>
  );
};

export default ProductsTable;
