import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Chat from "./Chat"; // Chat component is always shown (consider conditionally rendering it post-login)

function Login() {
  // State to hold form data: email and password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to hold feedback messages (success or error)
  const [message, setMessage] = useState("");

  // Handle input field changes and update state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Send POST request to backend API for login
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // If login is successful, show success message
        setMessage("✅ Login successful!");

        // Store JWT token in local storage
        localStorage.setItem("token", data.token);

        // Redirect user to homepage (consider using useNavigate from React Router)
        window.location.href = "/";

        // Clear form fields
        setFormData({
          email: "",
          password: "",
        });
      } else {
        // Show error message returned by API
        setMessage(`❗ ${data.message || "Login failed."}`);
      }
    } catch (error) {
      // Handle network or server errors
      setMessage("❗ Server error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Login form section */}
      <section>
        <div className="container-fluid h-custom mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {/* Left column with image */}
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Login Illustration"
              />
            </div>

            {/* Right column with login form */}
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                {/* Remember me and forgot password link */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                {/* Show feedback message */}
                {message && (
                  <div className="alert alert-info py-2" role="alert">
                    {message}
                  </div>
                )}

                {/* Submit button and registration link */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg px-5">
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="/register" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Chat and footer components */}
      <Chat />
      <Footer />
    </>
  );
}

export default Login;
