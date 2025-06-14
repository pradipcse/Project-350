import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Axios instance with JWT interceptor

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/api/seller/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await api.delete(`/api/seller/orders/${id}/`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading seller orders...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found for your products.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Buyer</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.user_email}</td>
                  <td className="px-4 py-2 border">{order.product_name}</td>
                  <td className="px-4 py-2 border">{order.quantity}</td>
                  <td className="px-4 py-2 border">${order.product_price}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => deleteOrder(order.id)}
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

export default SellerOrders;
