import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/api/v1/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
      });
  }, [id]);

  const handleAddToCart = () => {
    api.post('/api/v1/cart/', { product: product.id, quantity: 1 })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        alert('Added to cart!');
      })
      .catch((err) => {
        alert('Failed to add to cart. Please login.');
        console.error(err);
      });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full max-h-96 object-contain mb-4" />
      <p className="text-lg mb-2">Price: ${product.price}</p>
      {product.discount_price && (
        <p className="text-green-600 mb-2">Discounted Price: ${product.discount_price}</p>
      )}
      <p className="mb-4">{product.description}</p>
      <button
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
