
import React from "react";

const Sidebar = ({ setAdminView }) => {
  return (
    <div className="sidebar" style={{ width: "200px", background: "#333", color: "#fff", height: "100vh", padding: "20px" }}>
      <button onClick={() => setAdminView("dashboard")} style={buttonStyle}>Dashboard</button>
      <button onClick={() => setAdminView("addBook")} style={buttonStyle}>Add Book</button>
      <button onClick={() => setAdminView("viewBooks")} style={buttonStyle}>View Books</button>
      <button onClick={() => setAdminView("manageUsers")} style={buttonStyle}>Manage Users</button>
    </div>
  );
};


const buttonStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
};

export default Sidebar;
