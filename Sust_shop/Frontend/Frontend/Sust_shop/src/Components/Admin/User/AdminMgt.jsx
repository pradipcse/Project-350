/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../../services/api"; // your axios instance with interceptors
import { useSelector } from "react-redux";

export default function AdminMgt() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [role, setRole] = useState("admin");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({ email: "", phone_number: "" });
  const [error, setError] = useState(null);

  // Fetch users of selected role from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users/${role}/`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Load users on role or auth change
  useEffect(() => {
    if (!isAuthenticated || user?.user_type !== "admin") {
      return;
    }
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, isAuthenticated, user]);

  // Start editing user
  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setFormData({ email: user.email, phone_number: user.phone_number });
  };

  // Cancel editing user
  const handleCancelEdit = () => {
    setEditUserId(null);
    setFormData({ email: "", phone_number: "" });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update user info via API
  const handleUpdate = async (id) => {
    setError(null);
    try {
      await api.put(`/users/${role}/${id}/`, formData);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, ...formData } : user
        )
      );
      setEditUserId(null);
    } catch (err) {
      setError("Update failed.");
    }
  };

  // Delete user via API
  const handleDelete = async (id) => {
    setError(null);
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${role}/${id}/`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError("Delete failed.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6">User Management</h2>

      {/* Role selector */}
      <div className="mb-6 flex justify-center">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admins</option>
          <option value="seller">Sellers</option>
          <option value="user">Normal Users</option>
        </select>
      </div>

      {error && (
        <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
      )}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center">No users found for role "{role}".</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Is Staff</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === u.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editUserId === u.id ? (
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    u.phone_number || "N/A"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {u.is_staff ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  {editUserId === u.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(u.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(u)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
