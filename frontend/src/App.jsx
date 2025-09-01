// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";

import Login from "./pages/Login"; // Admin login
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const [role, setRole] = useState("");

  const handleLogout = () => setRole("");
  const handleAdminLogin = () => setRole("admin");
  const handleStudentLogin = () => setRole("student");

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/services" element={<Services />} />

        {/* Admin & Student Login/Register */}
        <Route path="/admin/login" element={<Login onLogin={handleAdminLogin} />} />
        <Route path="/student/login" element={<StudentLogin onLogin={handleStudentLogin} />} />
        <Route path="/student/register" element={<StudentRegister />} />

        {/* Backward compatibility */}
        <Route path="/adminLogin" element={<Navigate to="/admin/login" />} />
        <Route path="/studentLogin" element={<Navigate to="/student/login" />} />
        <Route path="/studentRegister" element={<Navigate to="/student/register" />} />

        {/* Admin Dashboard (protected) */}
        <Route
          path="/admin/dashboard"
          element={
            role === "admin" ? (
              <AdminDashboard onLogOut={handleLogout} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        {/* Student Dashboard (protected) */}
        <Route
          path="/student/dashboard"
          element={
            role === "student" ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/student/login" />
            )
          }
        />

        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
