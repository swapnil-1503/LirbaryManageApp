// import React, { useState } from "react";
// import "./Navbar.css";

// const Navbar = ({
//   role,
//   onLogout,
//   showHome,
//   showAdminLogin,
//   showStudentLogin,
//   showContact,
//   showAbout,
//   showServices,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLinkClick = (action) => {
//     setIsMenuOpen(false);
//     action();
//   };

//   return (
//     <nav className="navbar">
//       {/* Hamburger for mobile */}
//       <div className="hamburger-container">
//         <button
//           className="hamburger"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Left: Logo */}
//       <div className="navbar-left">
//         <a href="#" className="navbar-brand-link" onClick={showHome}>
//           <img
//             src="src/images/librarys.png"
//             alt="Library Logo"
//             className="navbar-logo-img"
//           />
//           <span className="navbar-brand">Library Management</span>
//         </a>
//       </div>

//       {/* Center: Navigation Links (only if not logged in) */}
//       {!role && (
//         <div className={`navbar-center ${isMenuOpen ? "open" : ""}`}>
//           <a href="#" onClick={() => handleLinkClick(showHome)}>Home</a>
//           <a href="#" onClick={() => handleLinkClick(showContact)}>ContactUs</a>
//           <a href="#" onClick={() => handleLinkClick(showAbout)}>AboutUs</a>
//           <a href="#" onClick={() => handleLinkClick(showServices)}>Services</a>
//         </div>
//       )}

//       {/* Right: Login/Logout */}
//       <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
//         {!role ? (
//           <>
//             <a href="#" onClick={() => handleLinkClick(showAdminLogin)}>AdminLogin</a>
//             <a href="#" onClick={() => handleLinkClick(showStudentLogin)}>StudentLogin</a>
//           </>
//         ) : (
//           <button className="logout-btn" onClick={onLogout}>Logout</button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ role, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Hamburger for mobile */}
      <div className="hamburger-container">
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand-link">
          <img src="src/images/librarys.png" alt="Library Logo" className="navbar-logo-img" />
          <span className="navbar-brand">Library Management</span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      {!role && (
        <div className={`navbar-center ${isMenuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/about">AboutUs</Link>
          <Link to="/services">Services</Link>
        </div>
      )}

      {/* Right: Login/Logout */}
      <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
        {!role ? (
          <>
            <Link to="/adminLogin">AdminLogin</Link>
            <Link to="/studentLogin">StudentLogin</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

