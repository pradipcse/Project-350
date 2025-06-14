import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'; // Axios instance
import CarouselSlider from '../Header/CaroselSlider';

const MEDIA_BASE_URL = 'http://127.0.0.1:8000';

const Home = () => {
  // State for main products section
  const [mainProducts, setMainProducts] = useState([]);
  // State for free products section
  const [freeProducts, setFreeProducts] = useState([]);
  // State for categories
  const [categories, setCategories] = useState([]);

  // For category modal popup
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    // Fetch main products
    api.get('/api/v1/products/')
      .then(res => setMainProducts(res.data))
      .catch(err => console.error('Failed to fetch main products:', err));

    // Fetch free products
    api.get('/api/free-products/')
      .then(res => setFreeProducts(res.data))
      .catch(err => console.error('Failed to fetch free products:', err));

    // Fetch categories
    api.get('/api/v1/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  // Handle category click to open modal and fetch products of that category
  const handleCategoryClick = async (category) => {
    setModalTitle(category.name);
    try {
      const res = await api.get(`/api/main/products/search/?category=${encodeURIComponent(category.name)}`);
      setCategoryProducts(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error loading category products:', error);
      setCategoryProducts([]);
      setIsModalOpen(true);
    }
  };

  // Helper to get image URL or placeholder
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x200?text=No+Image';
    return imagePath.startsWith('http') ? imagePath : `${MEDIA_BASE_URL}${imagePath}`;
  };

  return (
    <div>
      {/* Your existing carousel slider */}
       <div className='my-6'>
              <CarouselSlider />
            </div>

            {/* hero section */}
       <div className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 py-14 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to SustShop!
        </h1>
        <p className="mt-4 text-xl text-white max-w-xl mx-auto">
          Your one-stop shop for sustainable and eco-friendly products 🌿
          Explore our collection and make a positive impact on the planet.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          className="mt-8 px-8 py-3 bg-white text-green-600 font-bold rounded shadow hover:bg-green-100 transition"
        >
          Shop Now
        </button>
      </div>
      
      {/* Categories section */}
      <section id="categories" className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Main Products section */}
      <section id="main-products" className="p-6 max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mainProducts.length === 0 ? (
            <p className="text-center text-gray-600">No products available.</p>
          ) : (
            mainProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {product.image && (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="h-48 w-full object-contain mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
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
            ))
          )}
        </div>
      </section>

      {/* Free Products section */}
      <section id="free-products" className="p-6 max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Free Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {freeProducts.length === 0 ? (
            <p className="text-center text-gray-600">No free products available.</p>
          ) : (
            freeProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {product.image && (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="h-48 w-full object-contain mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <Link to={`/products/${product.id}`} className="mt-auto">
                  <button className="w-full mt-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      
     
      {/* Testimonials */}
      <section className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-extrabold mb-8">What Our Customers Say</h2>
          <div className="space-y-8">
            <blockquote className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              “I love the sustainable products here — great quality and fast shipping!”
              <footer className="mt-4 font-semibold">— Amina K.</footer>
            </blockquote>
            <blockquote className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              “Shopping at SustShop made me feel good about my environmental impact.”
              <footer className="mt-4 font-semibold">— Liam T.</footer>
            </blockquote>
            <blockquote className="bg-white rounded-lg shadow p-6 italic text-gray-700">
              “Excellent customer service and authentic eco-friendly products.”
              <footer className="mt-4 font-semibold">— Sofia R.</footer>
            </blockquote>
          </div>
        </div>
      </section>
 
      {/* Newsletter Signup */}
      <section className="max-w-4xl mx-auto my-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Stay Updated</h2>
        <p className="mb-6 text-gray-700">
          Subscribe to our newsletter for the latest eco-friendly deals and updates.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Subscribed! Thank you.');
          }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Category Products Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 overflow-auto">
          <div className="bg-white max-w-5xl w-full rounded-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-500 hover:text-black"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalTitle} Products</h2>
            {categoryProducts.length === 0 ? (
              <p>No products found in this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-auto">
                {categoryProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                  >
                    {product.image && (
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="h-48 w-full object-contain mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
