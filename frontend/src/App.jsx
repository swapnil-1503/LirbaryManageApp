// import React, { useState } from "react";
// import Login from "./pages/Login";
// import StudentLogin from "./pages/StudentLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import Navbar from "./components/Navbar";
// import Home from "./pages/home";
// import Contact from "./pages/contact";
// import Aboutus from "./pages/Aboutus";
// import Services from "./pages/Services";
// import "./pages/Home.css";
// import ManageUsers from "./pages/ManageUsers";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// function App() {
//   const [role, setRole] = useState("");
//   const [currentUnauthenticatedView, setCurrentUnauthenticatedView] = useState("home");

//   const handleLogout = () => {
//     setRole("");
//     setCurrentUnauthenticatedView("home");
//   };

//   const showHome = () => setCurrentUnauthenticatedView("home");
//   const showAdminLogin = () => setCurrentUnauthenticatedView("adminLogin");
//   const showStudentLogin = () => setCurrentUnauthenticatedView("studentLogin");
//   const showContact = () => setCurrentUnauthenticatedView("contact");
//   const showAbout = () => setCurrentUnauthenticatedView("about");
//   const showServices = () => setCurrentUnauthenticatedView("services");

//   const handleAdminLogin = () => {
//     setRole("admin");
//     setCurrentUnauthenticatedView("");
//   };

//   const handleStudentLogin = () => {
//     setRole("student");
//     setCurrentUnauthenticatedView("");
//   };

//   return (
//     <>
//       <Navbar
//         role={role}
//         onLogout={handleLogout}
//         showHome={showHome}
//         showAdminLogin={showAdminLogin}
//         showStudentLogin={showStudentLogin}
//         showContact={showContact}
//         showAbout={showAbout}
//         showServices={showServices}
//       />

//       {!role && currentUnauthenticatedView === "home" ? (
//         <div className="home-background">
//           <Home />
//         </div>
//       ) : (
//         <div className="d-flex">
//           {/* Admin Dashboard */}
//           {role === "admin" && <AdminDashboard onLogOut={handleLogout} />}

//           <div
//             className="flex-grow-1"
//             style={{
//               minHeight: "100vh",
//               overflowY: "auto",
//               padding: "2rem",
//               backgroundColor: "#f5f5f5",
//             }}
//           >
//             {/* Student Dashboard */}
//             {role === "student" && <StudentDashboard onLogout={handleLogout} />}

//             {/* Unauthenticated Views */}
//             {!role && currentUnauthenticatedView === "adminLogin" && (
//               <Login onLogin={handleAdminLogin} />
//             )}
//             {!role && currentUnauthenticatedView === "studentLogin" && (
//               <StudentLogin onLogin={handleStudentLogin} />
//             )}
//             {!role && currentUnauthenticatedView === "contact" && <Contact />}
//             {!role && currentUnauthenticatedView === "about" && <Aboutus />}
//             {!role && currentUnauthenticatedView === "services" && <Services />}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;


import React, { useState } from "react";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import ManageUsers from "./pages/ManageUsers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

        {/* Login Routes */}
        <Route path="/adminLogin" element={<Login onLogin={handleAdminLogin} />} />
        <Route path="/studentLogin" element={<StudentLogin onLogin={handleStudentLogin} />} />

        {/* Protected Routes */}
        {role === "admin" && (
          <Route path="/adminDashboard" element={<AdminDashboard onLogOut={handleLogout} />} />
        )}
        {role === "student" && (
          <Route path="/studentDashboard" element={<StudentDashboard onLogout={handleLogout} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

