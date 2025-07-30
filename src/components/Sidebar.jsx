import React from "react";

// Accept onLogOut as a prop
let Sidebar = ({ onLogOut }) => {
  return (
    <div style={{
      width: "200px",
      height: "100vh",
      background: "#333",
      color: "#fff",
      padding: "20px"
    }}>
      <h3>Admin Panel</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Add Book</li>
        <li>Manage Users</li>
        <li>Settings</li>
        <li style={{ marginTop: "20px", color: "red", cursor: "pointer" }}
          onClick={onLogOut} // Now onLogOut is a prop and can be called
        >Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;