import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';  // import useNavigate

const MEDIA_BASE_URL = 'http://127.0.0.1:8000';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/v1/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    try {
      const queryParam =
        searchType === 'name'
          ? `name=${encodeURIComponent(searchValue.trim())}`
          : `category=${encodeURIComponent(searchValue.trim())}`;

      const response = await api.get(`/api/main/products/search/?${queryParam}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x200?text=No+Image';
    return imagePath.startsWith('http') ? imagePath : `${MEDIA_BASE_URL}${imagePath}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Search Products</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center">
        <select
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
            setSearchValue('');
          }}
          className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Search by Product Name</option>
          <option value="category">Search by Category</option>
        </select>

        {searchType === 'category' ? (
          <select
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter product name"
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                {product.category && (
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                )}
                <p className="text-blue-600 font-bold text-lg mb-2">
                  ${product.current_price ?? product.price ?? 'N/A'}
                </p>
                {product.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                )}
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
