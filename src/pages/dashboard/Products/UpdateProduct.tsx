import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import UpdateproductsForm from "../../../components/dashboard/Products/UpdateproductsForm";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);

        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  // Log product when it updates
  useEffect(() => {
    if (product) {
      console.log('Fetched Product:', product);
    }
  }, [product]);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {product && (
        <UpdateproductsForm product={product} setProduct={setProduct} />
      )}
    </div>
  );
}

export default UpdateProduct;
