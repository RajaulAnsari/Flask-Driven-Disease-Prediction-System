import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import Chat from "./Chat";

function Register() {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // State for displaying status message and loading spinner
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes (including checkbox)
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("❗ Passwords do not match.");
      return;
    }

    // Terms and conditions checkbox validation
    if (!formData.acceptTerms) {
      setMessage("❗ You must accept the terms and conditions.");
      return;
    }

    // Show loading spinner
    setIsLoading(true);

    try {
      // Send POST request to register API
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      // Parse JSON response
      const data = await res.json();

      if (res.ok) {
        // On success: show message and reset form
        setMessage("✅ " + (data.message || "Registered successfully!"));
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      } else {
        // Show error message from server
        setMessage(`❗ ${data.message || "Registration failed."}`);
      }
    } catch (err) {
      // Handle fetch or network errors
      setMessage("❗ Server error. Please try again later.");
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Top navigation bar */}
      <Navbar />

      {/* Registration form section */}
      <section className="">
        <div className="container-fluid h-custom mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {/* Image section */}
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Register Illustration"
              />
            </div>

            {/* Form section */}
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                {/* Full Name input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="name"
                    className="form-control form-control-lg"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                </div>

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

                {/* Confirm Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>

                {/* Terms and conditions checkbox */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="acceptTerms">
                    I agree to the terms and conditions
                  </label>
                </div>

                {/* Display success/error messages */}
                {message && (
                  <div className="alert alert-info py-2" role="alert">
                    {message}
                  </div>
                )}

                {/* Submit button */}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Loading...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>

                  {/* Link to login page */}
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="link-danger">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Chat assistant component */}
      <Chat />

      {/* Page footer */}
      <Footer />
    </>
  );
}

export default Register;
