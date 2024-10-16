import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type FieldType = {
  Name?: string;
  Price?: string;
};

const Addproducts: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {  
    const { Name, Price } = values;

    // Create a normal object
    const productData = {
      name: Name,
      price: Price,
      image: fileUrl, // Add the uploaded file URL here
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
        alert('Product added successfully!');
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // Replace with your actual upload URL
    const uploadUrl = 'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload';

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFileUrl(data.secure_url); // Store the uploaded file URL
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      handleFileUpload(info.file.originFileObj); // Handle the file upload
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="Name"
        rules={[{ required: true, message: 'Please input product name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Price"
        name="Price"
        rules={[{ required: true, message: 'Please input product price!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={(e) => e && e.fileList}
        extra=""
      >
        <Upload name="logo" action={undefined} listType="picture" onChange={handleChange}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Addproducts;
