import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ role, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Hamburger for mobile */}
      <div className="hamburger-container">
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand-link">
          <img src="src/images/librarys.png" alt="Library Logo" className="navbar-logo-img" />
          <span className="navbar-brand">Library Management</span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      {!role && (
        <div className={`navbar-center ${isMenuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/about">AboutUs</Link>
          <Link to="/services">Services</Link>
        </div>
      )}

      {/* Right: Login/Logout */}
      <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        {!role ? (
          <>
            <Link to="/adminLogin">AdminLogin</Link>
            <Link to="/studentLogin">StudentLogin</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

