import React, { useState } from "react";
import Login from "./components/Login";
import StudentLogin from "./components/StudentLogin";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [role, setRole] = useState(""); // 'admin' or 'student'

  const handleLogout = () => setRole("");

  

  return (
    <>
      <Navbar role={role} onLogout={handleLogout} />
      <div className="container mt-5">
        {role === "admin" && <AdminDashboard onLogout={handleLogout} />}
        {role === "student" && <StudentDashboard onLogout={handleLogout} />}
        {!role && (
          <div className="text-center">
            <Login onLogin={() => setRole("admin")} />
            <hr />
            <StudentLogin onLogin={() => setRole("student")} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
