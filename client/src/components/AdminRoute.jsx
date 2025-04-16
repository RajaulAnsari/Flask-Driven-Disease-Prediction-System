import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminToken");

  return isLoggedIn ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
