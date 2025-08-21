import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddBook from "./AddBook";
import ViewBooks from "../components/ViewBooks";
import "./AdminDashboard.css"; // Import CSS

const AdminDashboard = ({ onLogOut }) => {
  const [adminView, setAdminView] = useState("dashboard");

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar setAdminView={setAdminView} />

      {/* Main Content */}
      <div className="dashboard-content">
        {adminView === "dashboard" && (
          <div className="dashboard-container">
            {/* Welcome Header */}
            <h2 className="dashboard-welcome">Welcome to Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-title">Total Books</p>
                <p className="stat-value">320</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Available Books</p>
                <p className="stat-value">270</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Users</p>
                <p className="stat-value">85</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Active Loans</p>
                <p className="stat-value">45</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <table>
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>The Alchemist</td>
                    <td>John Doe</td>
                    <td>Borrowed</td>
                    <td>2025-08-14</td>
                  </tr>
                  <tr>
                    <td>Clean Code</td>
                    <td>Jane Smith</td>
                    <td>Returned</td>
                    <td>2025-08-13</td>
                  </tr>
                  <tr>
                    <td>Atomic Habits</td>
                    <td>Mike Ross</td>
                    <td>Borrowed</td>
                    <td>2025-08-12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminView === "addBook" && <AddBook />}
        {adminView === "viewBooks" && <ViewBooks />}
      </div>
    </div>
  );
};

export default AdminDashboard;

