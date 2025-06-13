import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

const PMGT = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'electronics',
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
    }
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/v1/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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
    for (const key in newProduct) {
      if (newProduct[key]) {
        formData.append(key, newProduct[key]);
      }
    }

    try {
      if (editingProductId) {
        await api.put(`/api/v1/products/${editingProductId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/api/v1/products/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setNewProduct({
        name: '',
        category: 'electronics',
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
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setShowForm(true);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      discount_price: product.discount_price || '',
      stock: product.stock,
      description: product.description,
      image: null, // don't set existing image File
    });
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/v1/products/${id}/`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return <div className="p-4 text-red-600">Access denied. Admins only.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Product Management</h2>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingProductId(null);
          setNewProduct({
            name: '',
            category: 'electronics',
            price: '',
            discount_price: '',
            stock: '',
            description: '',
            image: null,
          });
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {showForm ? 'Hide Product Form' : 'Add New Product'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid gap-4 mb-6 bg-white shadow p-4 rounded">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="discount_price"
            value={newProduct.discount_price}
            onChange={handleChange}
            placeholder="Discount Price"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded"
            accept="image/*"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <h3 className="text-xl font-semibold mb-4">All Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow bg-white">
            {product.image && (
              <img
                src={
                  product.image.startsWith('http')
                    ? product.image
                    : `${import.meta.env.VITE_API_BASE_URL}${product.image}`
                }
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h4 className="text-lg font-bold">{product.name}</h4>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
            <p className="text-sm text-gray-600">Price: ${product.current_price}</p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline"
              >
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
