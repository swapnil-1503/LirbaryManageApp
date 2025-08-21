
// import React from "react";

// const Sidebar = ({ setAdminView }) => {
//   return (
//     <div className="sidebar" style={{ width: "200px", background: "#333", color: "#fff", height: "100vh", padding: "20px" }}>
//       <button onClick={() => setAdminView("dashboard")} style={buttonStyle}>Dashboard</button>
//       <button onClick={() => setAdminView("addBook")} style={buttonStyle}>Add Book</button>
//       <button onClick={() => setAdminView("viewBooks")} style={buttonStyle}>View Books</button>
//       <button onClick={() => setAdminView("manageUsers")} style={buttonStyle}>Manage Users</button>
//     </div>
//   );
// };


// const buttonStyle = {
//   width: "100%",
//   padding: "10px",
//   margin: "5px 0",
//   background: "transparent",
//   border: "none",
//   color: "white",
//   cursor: "pointer",
//   textAlign: "left",
// };

// export default Sidebar;



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
