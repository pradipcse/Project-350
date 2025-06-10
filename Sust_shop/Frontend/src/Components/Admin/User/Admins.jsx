import React, { useEffect, useState } from 'react';
import api from '../../../services/api';  // Your axios instance with auth
import { useSelector } from 'react-redux';

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    email: '',
    phone_number: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const user = useSelector(state => state.auth.user); // Currently unused, but could be used for role checks

  // Fetch all admin users
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await api.get('/v1/admin-user/');
      setAdmins(response.data);
      setError(null);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to load admin users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle form input changes
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Create new admin
  const handleCreate = async () => {
    try {
      await api.post('/v1/admin-user/', {
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
      });
      resetForm();
      fetchAdmins();
    } catch (err) {
      alert('Error creating admin: ' + (err.response?.data?.email || err.message));
    }
  };

  // Edit existing admin
  const handleEdit = (admin) => {
    setIsEditing(true);
    setFormData({
      id: admin.id,
      email: admin.email,
      phone_number: admin.phone_number,
      password: '', // Leave blank unless changing
    });
  };

  // Update admin user
  const handleUpdate = async () => {
    const payload = {
      email: formData.email,
      phone_number: formData.phone_number,
    };

    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      await api.patch(`/v1/admin-user/${formData.id}/`, payload);
      setIsEditing(false);
      resetForm();
      fetchAdmins();
    } catch (err) {
      alert('Error updating admin: ' + (err.response?.data?.email || err.message));
    }
  };

  // Delete admin user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await api.delete(`/v1/admin-user/${id}/`);
        fetchAdmins();
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        alert('Error deleting admin');
      }
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({ id: null, email: '', phone_number: '', password: '' });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Users Management</h1>

      <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        <h3>{isEditing ? 'Edit Admin' : 'Create New Admin'}</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="password"
          name="password"
          placeholder={isEditing ? "Leave blank to keep password" : "Password"}
          value={formData.password}
          onChange={handleChange}
          required={!isEditing}
          style={{ marginRight: 10 }}
        />
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={resetForm} style={{ marginLeft: 10 }}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreate}>Create</button>
        )}
      </div>

      <h2>Existing Admins</h2>

      {loading ? (
        <p>Loading admins...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', maxWidth: 700 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr><td colSpan="4">No admin users found.</td></tr>
            ) : (
              admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone_number}</td>
                  <td>
                    <button onClick={() => handleEdit(admin)}>Edit</button>
                    <button onClick={() => handleDelete(admin.id)} style={{ marginLeft: 10 }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
