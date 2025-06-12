import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api"
export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    user_type: "user", // default to normal user
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register/", {
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        user_type: formData.user_type,
      });

      setSuccess(true);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.phone_number?.[0] ||
          err.response?.data?.user_type?.[0] ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm text-center mb-4">
          Registration successful! Redirecting to login...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">User Type</label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            required
          >
            <option value="user">Normal User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
