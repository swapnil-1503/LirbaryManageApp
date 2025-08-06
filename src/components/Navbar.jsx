import React from "react";
import "./Navbar.css";

// Accept all the new view-changing functions as props
const Navbar = ({
  role,
  onLogout,
  showHome,
  showAdminLogin,
  showStudentLogin,
  showContact,
  showAbout,
  showServices
}) => {
  return (
    // The 'navbar' class typically makes this a flex container, allowing 'ms-auto' to work.
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* Brand/Logo Section - Always on the left */}
      <span className="navbar-brand">📚 Library Management</span>

      {/* Conditional rendering for ALL navigation links - only show if NOT logged in */}
      {!role && (
        <div className="navv">
          {/* Use onClick handlers to call the functions passed from App.jsx */}
          <a href="#" onClick={showHome}>Home</a>
          <a href="#" onClick={showContact}>Contact Us</a>
          <a href="#" onClick={showAbout}>About Us</a>
          <a href="#" onClick={showServices}>Services</a>
          {/* Login links are already conditionally rendered within this block */}
          <a href="#" onClick={showAdminLogin}>Admin Login</a>
          <a href="#" onClick={showStudentLogin}>Student Login</a>
        </div>
      )}

      {/* Conditional rendering for Logout button - only show if logged in */}
      {role && (
        // Added 'ms-auto' to push the button to the far right.
        <button className="btn btn-outline-light ms-auto" onClick={onLogout}>
          Logout
        </button>
      )}
      {/* The empty <span> for !role was removed as it's no longer needed and could affect layout. */}
    </nav>
  );
};

export default Navbar;