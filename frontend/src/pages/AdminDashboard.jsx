import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddBook from "./AddBook";
// Example if you put it inside a components folder:
import ViewBooks from "../components/ViewBooks";


const AdminDashboard = ({ onLogOut }) => {
  const [adminView, setAdminView] = useState("dashboard");

  return (
    <div className="d-flex">
      <Sidebar setAdminView={setAdminView} />
      <div style={{ flexGrow: 1, padding: "2rem", backgroundColor: "#f5f5f5" }}>
        {adminView === "dashboard" && <h2>Welcome to Admin Dashboard</h2>}
        {adminView === "addBook" && <AddBook />}
        {adminView === "viewBooks" && <ViewBooks />}
        {/* Add other views here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
