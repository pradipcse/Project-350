// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';  // axios instance with auth headers, baseURL etc.

const DeleteUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users only on search button click now
  const fetchUsers = async (query = '') => {
    try {
      const response = await api.get('/api/v1/users/search/', { params: { search: query } });
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  // No auto-fetch on input change — search on button click
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    fetchUsers(searchTerm);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/v1/users/search/${id}/`);
        fetchUsers(searchTerm);
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin User Management</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search users by email or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 flex-grow rounded"
        />
        <button
          onClick={handleSearchClick}
          className="ml-2 bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {users.length === 0 && <p>No users found.</p>}

      <ul>
        {users.map(user => (
          <li key={user.id} className="border p-2 mb-2 flex justify-between items-center rounded">
            <div>
              <p><strong>{user.email}</strong></p>
              <p>{user.phone_number}</p>
              <p>User Type: {user.user_type}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteUsers;
