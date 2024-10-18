import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface EditProductProps {
  product: Product;
  setProduct: (product: Product) => void;
}

const UpdateproductsForm: React.FC<EditProductProps> = ({ product, setProduct }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  console.log(product);

  useEffect(() => {
    // Set the form fields with the product data when the component mounts
    form.setFieldsValue({
      name: product.name,
      price: product.price,
    });
  }, [form, product]);

  const onFinish = async (values: { name: string; price: string }) => {
    // Convert price to number
    const price = parseFloat(values.price);

    // Check if the submitted values are the same as the current product values
    if (values.name === product.name && price === product.price) {
      message.warning('No changes made to the product.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, name: values.name, price }), // Merge old and new values
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProduct(updatedProduct); // Update the product in the parent component
        message.success('Product updated successfully!');
        navigate('/dashboard/products')
      } else {
        message.error('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Error updating product.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <Input type="number" min="0" step="0.01" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateproductsForm;
