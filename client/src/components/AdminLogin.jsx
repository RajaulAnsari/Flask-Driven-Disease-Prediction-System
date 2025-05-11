import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AdminLogin = () => {
  // State variables to manage form input and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    setError(""); // Clears previous errors

    try {
      // Sends login credentials to the backend
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      // Stores JWT token in localStorage on successful login
      const { token } = response.data;
      localStorage.setItem("adminToken", token);

      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";
    } catch (err) {
      // Displays an error message if login fails
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      {/* Centered card for login form */}
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="text-center mb-4">Admin Login</h2>

          {/* Error alert */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Login form */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                placeholder="admin@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                placeholder="********"
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
              Sign In
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-muted mt-4">
            For authorized administrators only
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
