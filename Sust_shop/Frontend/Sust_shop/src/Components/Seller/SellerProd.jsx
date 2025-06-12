/* eslint-disable react-hooks/exhaustive-deps */
// SellerProd.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const SellerProd = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    price: '',
    discount_price: '',
    stock: '',
    description: '',
    image: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  const fetchSellerProducts = async () => {
    try {
      const res = await api.get('/api/v1/products/');
      const sellerProducts = res.data.filter((product) => product.uploader === user.id);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'seller') {
      fetchSellerProducts();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (editProductId) {
        await api.put(`/api/v1/products/${editProductId}/`, data);
      } else {
        await api.post('/api/v1/products/', data);
      }
      fetchSellerProducts();
      resetForm();
    } catch (error) {
      console.error('Failed to submit product', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/api/v1/products/${productId}/`);
      fetchSellerProducts();
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discount_price: product.discount_price || '',
      stock: product.stock,
      description: product.description || '',
      image: null,
    });
    setEditProductId(product.id);
    setShowForm(true);
    setViewingProduct(null); // Close detail view if editing
  };

  const handleViewDetails = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discount_price: product.discount_price || '',
      stock: product.stock,
      description: product.description || '',
      image: null,
    });
    setEditProductId(product.id);
    setViewingProduct(product);
    setShowForm(false); // Hide add/edit form
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'electronics',
      price: '',
      discount_price: '',
      stock: '',
      description: '',
      image: null,
    });
    setEditProductId(null);
    setShowForm(false);
    setViewingProduct(null);
  };

  if (!isAuthenticated || user?.role !== 'seller') {
    return <p className="text-center mt-10 text-red-600">Access Denied: Only sellers can manage products.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Seller Dashboard</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white p-2 rounded">
          {showForm ? 'Close Form' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-100 p-4 rounded shadow mb-8">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" className="p-2 border" required />
          <select name="category" value={formData.category} onChange={handleInputChange} className="p-2 border">
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home & Kitchen</option>
            <option value="other">Other</option>
          </select>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="p-2 border" required />
          <input type="number" name="discount_price" value={formData.discount_price} onChange={handleInputChange} placeholder="Discount Price" className="p-2 border" />
          <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stock" className="p-2 border" required />
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="p-2 border" />
          <input type="file" name="image" onChange={handleInputChange} className="p-2 border" accept="image/*" />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">{editProductId ? 'Update' : 'Add'} Product</button>
            {editProductId && <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-2 rounded">Cancel</button>}
          </div>
        </form>
      )}

      {viewingProduct && (
        <div className="bg-white p-4 shadow-md rounded mb-8 border">
          <h3 className="text-xl font-semibold mb-2">Product Details</h3>
          {viewingProduct.image && (
            <img src={viewingProduct.image} alt={viewingProduct.name} className="w-48 h-48 object-cover mb-4" />
          )}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" className="p-2 border" required />
            <select name="category" value={formData.category} onChange={handleInputChange} className="p-2 border">
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="home">Home & Kitchen</option>
              <option value="other">Other</option>
            </select>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="p-2 border" required />
            <input type="number" name="discount_price" value={formData.discount_price} onChange={handleInputChange} placeholder="Discount Price" className="p-2 border" />
            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stock" className="p-2 border" required />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="p-2 border" />
            <input type="file" name="image" onChange={handleInputChange} className="p-2 border" accept="image/*" />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white p-2 rounded">Update Product</button>
              <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-2 rounded">Close</button>
            </div>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">${product.current_price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2 flex gap-2 flex-wrap">
                  <button onClick={() => handleViewDetails(product)} className="bg-blue-500 text-white px-2 py-1 rounded">View Details</button>
                  <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerProd;
