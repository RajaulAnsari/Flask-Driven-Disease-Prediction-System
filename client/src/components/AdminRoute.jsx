import React from "react";
import { Navigate } from "react-router-dom";

// AdminRoute component to protect admin-only routes
const AdminRoute = ({ children }) => {
  // Check if the admin is logged in by verifying the presence of the admin token in localStorage
  const isLoggedIn = localStorage.getItem("adminToken");

  // If logged in, render the child component (protected route)
  // If not logged in, redirect the user to the admin login page
  return isLoggedIn ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
