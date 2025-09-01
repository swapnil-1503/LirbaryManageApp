import React from "react";
import { FaTachometerAlt, FaBook, FaUsers, FaList } from "react-icons/fa"; // Icons
import "./Sidebar.css";

const Sidebar = ({ setAdminView }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <button onClick={() => setAdminView("dashboard")} className="sidebar-btn">
        <FaTachometerAlt className="sidebar-icon" /> Dashboard
      </button>
      <button onClick={() => setAdminView("addBook")} className="sidebar-btn">
        <FaBook className="sidebar-icon" /> Add Book
      </button>
      <button onClick={() => setAdminView("viewBooks")} className="sidebar-btn">
        <FaList className="sidebar-icon" /> View Books
      </button>
      <button onClick={() => setAdminView("manageUsers")} className="sidebar-btn">
        <FaUsers className="sidebar-icon" /> Manage Users
      </button>
    </div>
  );
};

export default Sidebar;
