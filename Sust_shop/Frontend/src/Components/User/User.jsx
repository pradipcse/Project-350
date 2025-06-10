import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>

      <div className="space-y-4 text-sm text-gray-700">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phone_number || "N/A"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}
