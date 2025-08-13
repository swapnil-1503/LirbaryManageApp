import React, { useState } from "react";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import "./pages/Home.css";

function App() {
  const [role, setRole] = useState("");
  const [currentUnauthenticatedView, setCurrentUnauthenticatedView] = useState("home");

  const handleLogout = () => {
    setRole("");
    setCurrentUnauthenticatedView("home");
  };

  const showHome = () => setCurrentUnauthenticatedView("home");
  const showAdminLogin = () => setCurrentUnauthenticatedView("adminLogin");
  const showStudentLogin = () => setCurrentUnauthenticatedView("studentLogin");
  const showContact = () => setCurrentUnauthenticatedView("contact");
  const showAbout = () => setCurrentUnauthenticatedView("about");
  const showServices = () => setCurrentUnauthenticatedView("services");

  const handleAdminLogin = () => {
    setRole("admin");
    setCurrentUnauthenticatedView("");
  };

  const handleStudentLogin = () => {
    setRole("student");
    setCurrentUnauthenticatedView("");
  };

  return (
    <>
      <Navbar
        role={role}
        onLogout={handleLogout}
        showHome={showHome}
        showAdminLogin={showAdminLogin}
        showStudentLogin={showStudentLogin}
        showContact={showContact}
        showAbout={showAbout}
        showServices={showServices}
      />

      {!role && currentUnauthenticatedView === "home" ? (
        <div className="home-background">
          <Home />
        </div>
      ) : (
        <div className="d-flex">
          {/* ✅ RENDER AdminDashboard when role is admin */}
          {role === "admin" && <AdminDashboard onLogOut={handleLogout} />}

          <div
            className="flex-grow-1"
            style={{
              minHeight: "100vh",
              overflowY: "auto",
              padding: "2rem",
              backgroundColor: "#f5f5f5",
            }}
          >
            {role === "student" && <StudentDashboard onLogout={handleLogout} />}

            {!role && currentUnauthenticatedView === "adminLogin" && (
              <Login onLogin={handleAdminLogin} />
            )}
            {!role && currentUnauthenticatedView === "studentLogin" && (
              <StudentLogin onLogin={handleStudentLogin} />
            )}
            {!role && currentUnauthenticatedView === "contact" && <Contact />}
            {!role && currentUnauthenticatedView === "about" && <Aboutus />}
            {!role && currentUnauthenticatedView === "services" && <Services />}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
