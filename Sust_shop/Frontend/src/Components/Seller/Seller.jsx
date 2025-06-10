import React, { useEffect, useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormState());
  const [errorMessage, setErrorMessage] = useState('');
  const { accessToken } = useSelector((state) => state.auth);

  function initialFormState() {
    return {
      title: '', category_id: '', description: '', price: '',
      discounted_price: '', stock_quantity: '', size: '',
      color: '', material: '', brand: '', weight: '',
      dimensions: '', warranty: '', return_policy: '', image: null,
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSellerProducts = useCallback(async () => {
    try {
      const res = await api.get('/api/v1/products/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setErrorMessage('Failed to load products.');
    }
  });

  useEffect(() => {
    fetchSellerProducts();
  }, [accessToken, fetchSellerProducts]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/products/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setErrorMessage('Failed to delete product.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    const {  category, ...rest } = product;
    setFormData({ ...rest, category_id: category?.id || '' });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '') payload.append(key, val);
    });

    try {
      if (editingProduct) {
        await api.put(`/api/v1/products/${editingProduct}/`, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await api.post('/api/v1/products/', payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      setFormData(initialFormState());
      setEditingProduct(null);
      fetchSellerProducts();
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to submit form.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded mb-6">
        {['title', 'description', 'price', 'discounted_price', 'stock_quantity', 'color', 'material', 'brand', 'weight', 'dimensions', 'warranty', 'return_policy'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace('_', ' ')}
            value={formData[field]}
            onChange={handleFormChange}
            className="p-2 border rounded"
          />
        ))}
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={formData.category_id}
          onChange={handleFormChange}
          className="p-2 border rounded"
        />
        <select
          name="size"
          value={formData.size}
          onChange={handleFormChange}
          className="p-2 border rounded"
        >
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFormChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">₹{product.price}</td>
                  <td className="border px-4 py-2">{product.stock_quantity}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Seller;
