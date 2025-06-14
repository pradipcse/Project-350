// src/pages/FreeProduct.jsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

const FreeProduct = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    api.get('/api/free-products/')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch free products:', err));
  }, []);

  const handleBook = (id) => {
    if (!user) {
      alert('Please login to book a product.');
      return;
    }

    api.post(`/api/free-products/${id}/book/`)
      .then(() => {
        alert('Product booked successfully!');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to book product.');
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Volunteer Free Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded p-4 flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500 mb-4">Uploaded by: {product.uploader_email}</p>
            <button
              onClick={() => handleBook(product.id)}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeProduct;
