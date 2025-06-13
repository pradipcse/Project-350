/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';

const Seller = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [formData, setFormData] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    bank_name: '',
    bank_account_number: '',
    routing_number: '',
    id_frontpage: null,
    id_backpage: null,
    seller_image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'seller') {
      fetchSellerDetails();
    }
  }, [user]);

  const fetchSellerDetails = async () => {
    try {
      const res = await api.get('/api/seller-details/');
      setSellerDetails(res.data);
      setFormData(res.data);
      setIsEditing(true);
      setShowForm(false);
    } catch (err) {
      setSellerDetails(null);
      setIsEditing(false);
      setShowForm(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
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
      if (isEditing) {
        await api.put('/api/seller-details/', data);
      } else {
        await api.post('/api/seller-details/create/', data);
      }
      fetchSellerDetails();
    } catch (error) {
      console.error('Failed to save seller details', error);
    }
  };

  if (!isAuthenticated || user?.role !== 'seller') {
    return (
      <p className="text-center mt-10 text-red-600">
        Access Denied: Only sellers can access this page.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Profile</h2>

      {/* Seller Details Card */}
      {sellerDetails && !showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={sellerDetails.seller_image}
              alt="Seller"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold">
                {sellerDetails.first_name} {sellerDetails.last_name}
              </h3>
              <p><strong>Phone:</strong> {sellerDetails.phone_number}</p>
              <p><strong>Bank:</strong> {sellerDetails.bank_name}</p>
              <p><strong>Account #:</strong> {sellerDetails.bank_account_number}</p>
              <p><strong>Routing:</strong> {sellerDetails.routing_number}</p>
            </div>
          </div>

          {/* ID Image View Toggles */}
          <div className="mt-4 space-y-4">
            <IDPreviewToggle label="ID Front Page" url={sellerDetails.id_frontpage} />
            <IDPreviewToggle label="ID Back Page" url={sellerDetails.id_backpage} />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </div>
      )}

      {/* Seller Details Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 bg-gray-100 p-6 rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">
            {isEditing ? 'Update' : 'Create'} Seller Details
          </h3>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="p-2 border rounded"
            required
          />
          <input
            name="bank_name"
            type="text"
            value={formData.bank_name}
            onChange={handleInputChange}
            placeholder="Bank Name"
            className="p-2 border rounded"
            required
          />
          <input
            name="bank_account_number"
            type="text"
            value={formData.bank_account_number}
            onChange={handleInputChange}
            placeholder="Bank Account Number"
            className="p-2 border rounded"
            required
          />
          <input
            name="routing_number"
            type="text"
            value={formData.routing_number}
            onChange={handleInputChange}
            placeholder="Routing Number"
            className="p-2 border rounded"
            required
          />

          <label className="font-medium">ID Front Page:</label>
          <input
            name="id_frontpage"
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className="p-2 border rounded"
          />

          <label className="font-medium">ID Back Page:</label>
          <input
            name="id_backpage"
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className="p-2 border rounded"
          />

          <label className="font-medium">Seller Image:</label>
          <input
            name="seller_image"
            type="file"
            onChange={handleInputChange}
            accept="image/*"
            className="p-2 border rounded"
          />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white p-2 px-4 rounded"
            >
              {isEditing ? 'Update' : 'Create'} Profile
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

// Toggle Component for ID Images
const IDPreviewToggle = ({ label, url }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShow(!show)}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {show ? `Hide ${label}` : `View ${label}`}
      </button>
      {show && (
        <div className="mt-2">
          <img
            src={url}
            alt={label}
            className="w-full max-w-sm border rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default Seller;
