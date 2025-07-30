import React from "react";

const Navbar = ({ role, onLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">📚 Library Management</span>
      {role ? (
        <button className="btn btn-outline-light" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <span className="text-light">Not Logged In</span>
      )}
    </nav>
  );
};

export default Navbar;
