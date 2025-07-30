import React from "react";
import Sidebar from "./Sidebar";
import BookTable from "./BookTable";

console.log("Admin Dashboard Rendered");

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="d-flex">
      <Sidebar onLogout={onLogout} />
      <main className="p-4 flex-grow-1">
        <h2>Admin Dashboard</h2>
        <BookTable />
      </main>
    </div>
  );
};

export default AdminDashboard;
