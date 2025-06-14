import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const { full_name, phone, address, city, postal_code } = orderData;
    if (!full_name || !phone || !address || !city || !postal_code) {
      alert('All fields are required.');
      return;
    }

    try {
      await api.post('/api/orders/create-from-cart/', orderData);
      alert('Order placed successfully!');
      setCartItems([]);
      setShowOrderForm(false);
      setOrderData({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
      });
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
            {!showOrderForm ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Place Order
              </button>
            ) : (
              <form
                onSubmit={submitOrder}
                className="mt-6 space-y-4 border p-4 rounded shadow-sm"
              >
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={orderData.full_name}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={orderData.city}
                      onChange={handleInputChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium">Postal Code</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={orderData.postal_code}
                      onChange={handleInputChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
