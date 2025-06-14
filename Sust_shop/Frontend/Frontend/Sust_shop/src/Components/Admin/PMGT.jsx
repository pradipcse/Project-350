import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import { useSelector } from 'react-redux';

const PMGT = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '',
    categoryId: '',
    price: '',
    discount_price: '',
    stock: '',
    description: '',
    image: null,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchProducts();
      fetchCategories();
    }
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    try {
      // Fetch products and categories in parallel
      const [productRes, categoryRes] = await Promise.all([
        api.get('/api/v1/products/'),
        api.get('/api/v1/categories/'),
      ]);

      // Create map of category id -> name
      const categoryMap = {};
      categoryRes.data.forEach((cat) => {
        categoryMap[cat.id] = cat.name;
      });

      // Replace category id with category name in each product
      const updatedProducts = productRes.data.map((product) => ({
        ...product,
        category: categoryMap[product.category] || 'Unknown',
      }));

      setProducts(updatedProducts);
      setCategories(categoryRes.data);
    } catch (error) {
      console.error('Error fetching products or categories!', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/v1/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', newProduct.name);
    formData.append('category', newProduct.categoryId);
    formData.append('price', newProduct.price);
    formData.append('discount_price', newProduct.discount_price);
    formData.append('stock', newProduct.stock);
    formData.append('description', newProduct.description);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      if (editingProductId) {
        await api.put(
          `/api/v1/products/${editingProductId}/`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        );
      } else {
        await api.post('/api/v1/products/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setNewProduct({ 
        name: '',
        categoryId: '',
        price: '',
        discount_price: '',
        stock: '',
        description: '',
        image: null,
      });
      setEditingProductId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product!', error);
    }
  };

  const handleEdit = (product) => {
    setShowForm(true);
    setNewProduct({ 
      name: product.name,
      categoryId: product.categoryId || product.category, // categoryId for form
      price: product.price,
      discount_price: product.discount_price,
      stock: product.stock,
      description: product.description,
      image: null,
    });
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/v1/products/${id}/`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product!', error);
      }
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return <div className="p-4 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Admin Product Management
      </h2>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingProductId(null);
          setNewProduct({ 
            name: '',
            categoryId: '',
            price: '',
            discount_price: '',
            stock: '',
            description: '',
            image: null,
          });
        }}
        className="mb-4 bg-blue-600 text-gray-50 px-4 py-2 rounded">
        {showForm ? 'Hide Product Form' : 'Add Product'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mb-6 p-4 rounded shadow">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />

          <select
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleChange}
            required
            className="border p-2 rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="discount_price"
            value={newProduct.discount_price}
            onChange={handleChange}
            placeholder="Discount price"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded">
          </textarea>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded"
            accept="image/*"
          />

          <button
            type="submit"
            className="bg-green-600 text-gray-50 px-4 py-2 rounded">
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <h3 className="text-xl font-semibold mb-4">All Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow">
            {product.image && (
              <img
                src={product.image.startsWith('http')
                    ? product.image
                    : `${import.meta.env.VITE_API_BASE_URL}${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}

            <h4 className="text-lg font-semibold">
              {product.name}
            </h4>
            <p>Category: {product.category}</p> {/* Category name now */}
            <p>Price: {product.current_price}</p>
            <p>Stock: {product.stock}</p>

            <p className="text-gray-500 mt-2">
              {product.description}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600">
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PMGT;
