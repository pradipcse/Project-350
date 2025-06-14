import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminOrderMgt = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('api/admins/orders/');
      console.log('📦 Full /admin/orders/ response:', res.data);

      // Check if the response is an array
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } 
      // If paginated
      else if (res.data.results && Array.isArray(res.data.results)) {
        setOrders(res.data.results);
      } 
      // If permission denied or unexpected structure
      else if (res.data.detail) {
        setError(res.data.detail);
        setOrders([]);
      } 
      else {
        setError('Unexpected response from server.');
        console.warn('⚠️ Unexpected format:', res.data);
      }
    } catch (err) {
      console.error('❌ API Error:', err);
      setError('Failed to fetch orders');
      setOrders([]);
    }
    setLoading(false);
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await api.delete(`api/admins/orders/${orderId}/`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('❌ Failed to delete order:', err);
      alert('Error deleting order');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && orders.length === 0 && !error && <p>No orders found.</p>}

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p><strong>Customer:</strong> {order.full_name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}, {order.city}, {order.postal_code}</p>
              <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.is_paid ? 'Paid' : 'Pending'}</p>
            </div>
            <button
              onClick={() => handleDelete(order.id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Items:</h4>
            {order.items && order.items.length > 0 ? (
              <ul className="pl-4 list-disc">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.product_name} - Qty: {item.quantity}, Price: ${item.product_price}
                    <br />
                    <small>Seller: {item.seller?.email} ({item.seller?.user_type})</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in this order.</p>
            )}
          </div>

          <div className="mt-2">
            <strong>Total Price: ${order.total}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderMgt;
