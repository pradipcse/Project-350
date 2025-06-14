import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import CarouselSlider from '../Header/CaroselSlider';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [freeProducts, setFreeProducts] = useState([]);
  const [addingProductIds, setAddingProductIds] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await api.get('/api/v1/categories/');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async (categorySlug = null) => {
    try {
      const url = categorySlug
        ? `/api/v1/products/?category=${categorySlug}`
        : '/api/v1/products/';
      const res = await api.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchFreeProducts = async () => {
    try {
      const res = await api.get('/api/free-products/');
      setFreeProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch free products:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchFreeProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      setAddingProductIds((prev) => [...prev, productId]);
      await api.post('/api/v1/cart/', { product: productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('Failed to add product to cart.');
    } finally {
      setAddingProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleCategoryClick = (slug) => {
    fetchProducts(slug);
  };

  return (
    <div className="bg-gray-50 min-h-screen mx-4">
      <div className='my-6'>
        <CarouselSlider />
      </div>
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

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <aside className="bg-white rounded shadow p-6 sticky top-24 h-fit">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => handleCategoryClick(cat.slug)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Our Products Section */}
        <section className="md:col-span-3">
          <h2 className="text-3xl font-extrabold mb-6">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const isAdding = addingProductIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md flex flex-col"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-600 line-through">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                    <p className="text-green-700 font-bold mb-4">
                      ${parseFloat(product.discount_price || product.price).toFixed(2)}
                    </p>
                    <div className="mt-auto flex justify-between items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={isAdding}
                        className={`flex-grow py-2 rounded text-white font-semibold ${
                          isAdding
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="flex-grow py-2 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Free Product Section */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Volunteer Free Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {freeProducts.map((product) => (
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
                onClick={() => alert('Go to Free Product page to book')}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory scrollbar-hide">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] snap-center bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-green-700 font-bold mb-2">
                ${parseFloat(product.discount_price || product.price).toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={addingProductIds.includes(product.id)}
                className={`py-2 rounded text-white font-semibold ${
                  addingProductIds.includes(product.id)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {addingProductIds.includes(product.id) ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ))}
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
    </div>
  );
}
