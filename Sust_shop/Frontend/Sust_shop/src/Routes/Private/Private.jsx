import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided, check if user role matches
  if (allowedRoles && allowedRoles.length > 0) {
    // Assuming user.role contains the current user's role, e.g. 'admin', 'seller', etc.
    if (!user || !allowedRoles.includes(user.role)) {
      // Show message or redirect to unauthorized page
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      );
    }
  }

  // User is authenticated and authorized, render children
  return children;
};

export default ProtectedRoute;
