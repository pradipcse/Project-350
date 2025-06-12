import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/manage-users")}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Manage Users
        </button>

        <button
          onClick={() => navigate("/admin/manage-orders")}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Manage Orders
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
