import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Your custom Axios instance
import { useSelector } from 'react-redux';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/v1/products/');
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleReviewSubmit = async (productId) => {
    if (!reviewText.trim()) return;

    try {
      await api.post(`/api/v1/products/${productId}/reviews/`, {
        review: reviewText,
      });

      alert('Review submitted!');
      setReviewText('');
      setSelectedProductId(null);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('You might already have reviewed or an error occurred.');
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-xl overflow-hidden p-4"
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="mt-2 text-green-700 font-bold text-lg">
            ${product.current_price}
          </p>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-3">
            ⭐ {product.average_rating.toFixed(1)} / 5 (
            {product.number_of_reviews} reviews)
          </div>

          {isAuthenticated && (
            <div className="mt-4">
              <textarea
                className="w-full border rounded p-2"
                placeholder="Write your review..."
                value={
                  selectedProductId === product.id ? reviewText : ''
                }
                onChange={(e) => {
                  setReviewText(e.target.value);
                  setSelectedProductId(product.id);
                }}
              />
              <button
                onClick={() => handleReviewSubmit(product.id)}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
