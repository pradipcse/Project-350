import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/api/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading your orders...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow">
              <div className="mb-2">
                <strong>Order #{order.id}</strong> — {new Date(order.created_at).toLocaleString()}
              </div>
              <p>
                <strong>Shipping:</strong> {order.full_name}, {order.address}, {order.city} - {order.postal_code} | Phone: {order.phone}
              </p>
              <p className="mt-2">
                <strong>Total:</strong> ${order.total}
              </p>
              <ul className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="border p-2 rounded bg-gray-50">
                    <div><strong>{item.product_name}</strong> — Quantity: {item.quantity}</div>
                    <div>Uploader: {item.uploader_email}</div>
                    <div>Price: ${item.price}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
