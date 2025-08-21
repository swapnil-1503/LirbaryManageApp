import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-background">
      <div className="home-co">
        
        <p className="home-subtitle">
          <h1>Welcome to the Library Management System</h1>
          Manage books, users, and library activities efficiently.
        </p>
        <button className="learn-more-btn">Learn More</button>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Library Management System | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
