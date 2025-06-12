import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'; // Axios instance

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/api/v1/products/')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-contain mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <div className="mb-2">
              {product.discount_price ? (
                <>
                  <p className="text-gray-600 line-through">${product.price}</p>
                  <p className="text-green-600 font-bold">${product.discount_price}</p>
                </>
              ) : (
                <p className="text-gray-800 font-bold">${product.price}</p>
              )}
            </div>
            <Link to={`/products/${product.id}`} className="mt-auto">
              <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
