import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddBook from "./AddBook";
import ViewBooks from "../components/ViewBooks";
import ManageUsers from "./ManageUsers";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = ({ onLogOut }) => {
  const [adminView, setAdminView] = useState("dashboard");
  const [stats, setStats] = useState({
    bookCount: 0,
    totalBooks: 0,
    availableBooks: 0,
    totalUsers: 0,
    totalIssued: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (adminView === "dashboard") {
      fetchStats();
      fetchRecentActivity();
    }
  }, [adminView]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: getAuthHeaders(),
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/recent-activity",
        { headers: getAuthHeaders() }
      );
      setRecentActivity(res.data);
    } catch (err) {
      console.error("Error fetching recent activity:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setAdminView={setAdminView} onLogOut={onLogOut} />

      <div className="dashboard-content">
        {adminView === "dashboard" && (
          <div className="dashboard-container">
            <h2 className="dashboard-welcome">Welcome to Admin Dashboard</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <p className="stat-title">Total Titles</p>
                <p className="stat-value">{stats.bookCount}</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Total Stock</p>
                <p className="stat-value">{stats.totalBooks}</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Available Books</p>
                <p className="stat-value">{stats.availableBooks}</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Users</p>
                <p className="stat-value">{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <p className="stat-title">Active Loans</p>
                <p className="stat-value">{stats.totalIssued}</p>
              </div>
            </div>

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
                  {recentActivity.map((act) => (
                    <tr key={act.issue_id}>
                      <td>{act.title}</td>
                      <td>{act.student_name}</td>
                      <td>{act.status === "issued" ? "Borrowed" : "Returned"}</td>
                      <td>
                        {act.status === "issued"
                          ? new Date(act.issue_date).toLocaleDateString()
                          : new Date(act.return_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminView === "addBook" && <AddBook />}
        {adminView === "viewBooks" && <ViewBooks />}
        {adminView === "manageUsers" && <ManageUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
