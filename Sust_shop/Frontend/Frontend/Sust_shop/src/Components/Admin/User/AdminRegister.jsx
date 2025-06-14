import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
    
      // eslint-disable-next-line no-unused-vars
      const response = await api.post('/api/create-admin/', formData);
      setSuccess('Admin registered successfully!');
      setFormData({ email: '', phone_number: '', password: '' });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        'Failed to register admin. Make sure you are authorized.'
      );
    }
  };

  
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <p className="text-red-600">
        Access denied. Only admins can register new admins.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Register a New Admin</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
