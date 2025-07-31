import React, { useState } from "react";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Sidebar from "./components/Sidebar"; 
import BookTable from "./components/Booktable";

function App() {
  const [role, setRole] = useState(""); // 'admin' or 'student'
  const [currentUnauthenticatedView, setCurrentUnauthenticatedView] = useState('home');

  const handleLogout = () => {
    setRole("");
    setCurrentUnauthenticatedView('home');
  };

  const showHome = () => setCurrentUnauthenticatedView('home');
  const showAdminLogin = () => setCurrentUnauthenticatedView('adminLogin');
  const showStudentLogin = () => setCurrentUnauthenticatedView('studentLogin');
  const showContact = () => setCurrentUnauthenticatedView('contact');
  const showAbout = () => setCurrentUnauthenticatedView('about');
  const showServices = () => setCurrentUnauthenticatedView('services');

  const handleAdminLogin = () => {
    setRole("admin");
    setCurrentUnauthenticatedView('');
  };

  const handleStudentLogin = () => {
    setRole("student");
    setCurrentUnauthenticatedView('');
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
      {/* Main content area */}
      <div className="flex"> {/* Use Tailwind flex to arrange sidebar and content */}
        {/* Render Sidebar if role is 'admin' */}
        {role === "admin" && <Sidebar onLogOut={handleLogout} />} {/* Pass onLogOut if Sidebar needs it */}

        <div className="container mt-5 flex-grow"> {/* flex-grow makes it take remaining space */}
          {/* Render AdminDashboard if role is 'admin' */}
          {role === "admin" && <AdminDashboard onLogout={handleLogout} />}

          {/* Render StudentDashboard if role is 'student' */}
          {role === "student" && <StudentDashboard onLogout={handleLogout} />}

          {/* Render unauthenticated views */}
          {!role && (
            <div className="text-center">
              {currentUnauthenticatedView === 'home' && (
                <>
                  <Home />
                  <p className="mt-4 text-white">Please select your login type:</p>
                  <button className="btn btn-primary mx-2" onClick={showAdminLogin}>Admin Login</button>
                  <button className="btn btn-secondary mx-2" onClick={showStudentLogin}>Student Login</button>
                </>
              )}
              {currentUnauthenticatedView === 'adminLogin' && (
                <Login onLogin={handleAdminLogin} />
              )}
              {currentUnauthenticatedView === 'studentLogin' && (
                <StudentLogin onLogin={handleStudentLogin} />
              )}
              {currentUnauthenticatedView === 'contact' && (
                <div><h2>Contact Us Page</h2><p>This is placeholder content for Contact Us.</p></div>
              )}
              {currentUnauthenticatedView === 'about' && (
                <div><h2>About Us Page</h2><p>This is placeholder content for About Us.</p></div>
              )}
              {currentUnauthenticatedView === 'services' && (
                <div><h2>Services Page</h2><p>This is placeholder content for Services.</p></div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

