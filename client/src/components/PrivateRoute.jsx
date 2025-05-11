import React from "react";
import { Navigate } from "react-router-dom";

// A wrapper component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated by verifying token in localStorage
  const isLoggedIn = localStorage.getItem("token");

  // If token exists, render the requested component (children)
  // Otherwise, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
