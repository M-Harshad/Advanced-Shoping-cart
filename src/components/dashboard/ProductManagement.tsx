import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Row, Col, Card, List } from 'antd';
import type { FormProps } from 'antd';

type FieldType = {
  id?: string;
  name?: string;
  price?: number;
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<FieldType | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { name, price } = values;

    if (editingProduct) {
      // Update existing product
      const updatedProductData = {
        ...editingProduct,
        name: name,
        price: price,
      };

      try {
        const response = await fetch(`http://localhost:3000/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProductData),
        });

        if (response.ok) {
          message.success('Product updated successfully!');
          const updatedProduct = await response.json();
          setProducts((prev) =>
            prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
          );
          setEditingProduct(null); // Reset editing product
        } else {
          message.error('Failed to update product.');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        message.error('Error updating product.');
      }
    } else {
      // Add new product
      const existingProduct = products.find(
        (product) => product.name === name && product.price === price
      );

      if (existingProduct) {
        message.error('Product with the same name and price already exists.');
        return;
      }

      const nextId = (products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1).toString();

      const productData = {
        id: nextId,
        name: name,
        price: price,
        image: null,
      };

      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          message.success('Product added successfully!');
          const newProduct = await response.json();
          setProducts((prev) => [...prev, newProduct]);
        } else {
          message.error('Failed to add product.');
        }
      } catch (error) {
        console.error('Error posting data:', error);
        message.error('Error posting data.');
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleEdit = (product: FieldType) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div style={{ background: '#f0f2f5', padding: '50px' }}>
      <Row justify="center">
        <Col span={12}>
          {editingProduct ? (
            <Card title="Edit Product" bordered={false} style={{ borderRadius: '8px' }}>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{ name: editingProduct.name, price: editingProduct.price }}
              >
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input product name!' }]}
                >
                  <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Please input product price!' }]}
                >
                  <Input type="number" min="0" step="0.01" placeholder="Enter product price" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                  <Button type="primary" htmlType="submit" style={{ borderRadius: '5px' }}>
                    Update
                  </Button>
                  <Button type="default" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ) : (
            <Card title="Add New Product" bordered={false} style={{ borderRadius: '8px' }}>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input product name!' }]}
                >
                  <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: 'Please input product price!' }]}
                >
                  <Input type="number" min="0" step="0.01" placeholder="Enter product price" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                  <Button type="primary" htmlType="submit" style={{ borderRadius: '5px' }}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Product List" bordered={false} style={{ borderRadius: '8px' }}>
            <List
              dataSource={products}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" onClick={() => handleEdit(item)}>Edit</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`Price: $${parseFloat(item.price).toFixed(2)}`} // Ensure price is a float
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductManagement;
