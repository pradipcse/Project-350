import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import  axios from "../../services/api"; // your configured axios instance
import { login } from "../../auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login/", formData);

      const { access, refresh } = response.data;

      // Optionally fetch user info if needed (replace with your user endpoint)
      const userResponse = await axios.get("/api/user/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      // Dispatch to Redux
      dispatch(
        login({
          accessToken: access,
          refreshToken: refresh,
          user: userResponse.data,
        })
      );

      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      {error && (
        <p className="text-red-600 text-sm text-center mb-4">{error}</p>
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
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
