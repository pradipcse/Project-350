// src/pages/FreeProductMgt.jsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const FreeProductMgt = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchMyProducts = () => {
    api.get('/api/free-products/mine/')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (form.image) formData.append('image', form.image);

    const request = editingId
      ? api.put(`/api/free-products/${editingId}/`, formData)
      : api.post('/api/free-products/', formData);

    request
      .then(() => {
        alert(`Product ${editingId ? 'updated' : 'added'} successfully`);
        setForm({ name: '', description: '', image: null });
        setEditingId(null);
        fetchMyProducts();
      })
      .catch((err) => {
        console.error('Submit error:', err);
        alert('Failed to submit.');
      });
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, description: product.description, image: null });
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure?')) return;

    api.delete(`/api/free-products/${id}/`)
      .then(() => {
        alert('Deleted successfully');
        fetchMyProducts();
      })
      .catch((err) => {
        console.error('Delete error:', err);
        alert('Failed to delete.');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Your Free Products</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleInput}
          placeholder="Product name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Product description"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded p-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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

export default FreeProductMgt;
