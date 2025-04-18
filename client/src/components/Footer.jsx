import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-box">
      <h1
        style={{
          color: "green",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        Disease Prediction System
      </h1>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <p className="footer-heading">About Us</p>
            <a href="#" className="footer-link">
              Our Mission
            </a>
            <a href="#" className="footer-link">
              How It Works
            </a>
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Services</p>
            <a href="/symptomschecker" className="footer-link">
              Symptom Checker
            </a>
            <a href="#" className="footer-link">
              Health Reports
            </a>
            <a href="#" className="footer-link">
              AI Diagnosis
            </a>
            <a href="#" className="footer-link">
              Medical Insights
            </a>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Contact Us</p>
            <a
              href="mailto:aidiseasepredictor@gmail.com"
              className="footer-link"
            >
              Email Support
            </a>
            <a href="tel:+9779807906411" className="footer-link">
              +977-9807906411
            </a>
            <a href="#" className="footer-link">
              Live Chat
            </a>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Social Media</p>
            <a
              href="https://www.facebook.com/rajaul.ansari1432/"
              className="footer-link"
            >
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </a>
            <a
              href="https://www.instagram.com/razaul_____ansari/"
              className="footer-link"
            >
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </a>
            <a href="https://www.x.com/" className="footer-link">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </a>
            <a
              href="https://www.linkedin.com/in/md-rajaul-ansari/"
              className="footer-link"
            >
              <i className="fab fa-linkedin">
                <span style={{ marginLeft: "10px" }}>LinkedIn</span>
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
