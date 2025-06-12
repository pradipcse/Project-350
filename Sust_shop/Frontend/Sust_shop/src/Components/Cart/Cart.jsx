import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Your axios instance with auth
import { useSelector } from 'react-redux';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const fetchCart = async () => {
    try {
      const res = await api.get('/api/v1/cart/');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/api/v1/cart/${id}/`);
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      await api.put(`/api/v1/cart/${id}/`, {
        product: item.product,
        quantity,
      });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const placeOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));

      await api.post('/api/v1/orders/create/', { items });
      alert('Order placed successfully!');
      setCartItems([]);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>Please log in to view your cart.</p>;
  if (loading) return <p>Loading your cart...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.product_name}</p>
                  <p className="text-gray-600">${item.product_price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border px-2 py-1"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={placeOrder}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
