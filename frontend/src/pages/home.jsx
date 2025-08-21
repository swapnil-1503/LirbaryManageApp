import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS file

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-background">
        <h1 className="home-co animate__animated animate__fadeInDown">
          Welcome to the Library Management System
        </h1>
        <p className="home-subtitle animate__animated animate__fadeInUp">
          Manage books, users, and library activities efficiently
        </p>
        <div className="login-buttons">
          <Link to="/studentLogin" className="btn-custom student-btn">
             Student Login
          </Link>
          <Link to="/adminLogin" className="btn-custom admin-btn">
             Admin Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container py-5 text-center">
        <h2 className="mb-4 fw-bold">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card feature-card shadow-lg border-0 p-4">
              <h3>Books</h3>
              <p>Search, borrow, and manage books with ease.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card feature-card shadow-lg border-0 p-4">
              <h3>Students</h3>
              <p>Seamless student login & registration system.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card feature-card shadow-lg border-0 p-4">
              <h3>Admin</h3>
              <p>Admins can manage books, users, and records easily.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card feature-card shadow-lg border-0 p-4">
              <h3>Reports</h3>
              <p>Generate usage reports and monitor library activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">About Our Library</h2>
          <p className="lead">
            Our library management system helps students and admins streamline
            the process of managing books, tracking users, and improving
            learning experiences.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        © {new Date().getFullYear()} Library Management System | All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
