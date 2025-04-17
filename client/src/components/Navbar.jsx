import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaBars className="navbar-bars" onClick={toggleMenu} />
      </div>

      <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <NavLink to="/" className="navbar-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink
          to="/symptomschecker"
          className="navbar-link"
          activeClassName="active"
        >
          Symptom Checker
        </NavLink>
        <NavLink to="/reports" className="navbar-link" activeClassName="active">
          My History
        </NavLink>
        <NavLink to="/faq" className="navbar-link" activeClassName="active">
          FAQ
        </NavLink>
        <NavLink to="/blog" className="navbar-link" activeClassName="active">
          Blog
        </NavLink>

        {!isLoggedIn && (
          <NavLink
            to="/register"
            className="navbar-link"
            activeClassName="active"
          >
            Register
          </NavLink>
        )}
      </div>

      <div className={`navbar-btn ${isMenuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="navbar-btn-link">
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="navbar-btn-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
