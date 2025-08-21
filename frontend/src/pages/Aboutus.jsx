import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-wrapper">
      <div className="aboutus-banner">
        <h1>About Library Management System</h1>
        <p>
          Empowering libraries with smarter tools to manage books, users, and operations with ease.
        </p>
      </div>

      <div className="aboutus-content">
        <section className="aboutus-section">
          <h2> Our Vision</h2>
          <p>
            To digitally transform every library into a smart, accessible, and efficient knowledge center.
          </p>
        </section>

        <section className="aboutus-section">
          <h2> Our Mission</h2>
          <p>
            We aim to simplify and automate library workflows to improve resource management, enhance
            user experience, and support digital literacy.
          </p>
        </section>

        <section className="aboutus-section">
          <h2> Key Features</h2>
          <ul>
            <li>Book lending and return management</li>
            <li>Live tracking of issued and available books</li>
            <li>Barcode and RFID integration support</li>
            <li>Student & Staff login with role-based access</li>
            <li>Fine management and overdue alerts</li>
            <li>Comprehensive analytics and reporting tools</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2> Who Can Use</h2>
          <p>
            Our LMS is perfect for:
          </p>
          <ul>
            <li>Schools and Colleges</li>
            <li>Universities and Institutions</li>
            <li>Public and Government Libraries</li>
            <li>Private Organizations with internal libraries</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2> Why Choose Us?</h2>
          <ul>
            <li>Responsive and modern UI</li>
            <li>Cloud-ready and scalable</li>
            <li>Secure and role-based access</li>
            <li>24/7 support and training</li>
            <li>Customization as per client needs</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2>💬 Testimonials</h2>
          <blockquote>
            “This LMS helped us manage thousands of books efficiently and saved hours of manual work.” – Mr. Deshmukh, Librarian
          </blockquote>
          <blockquote>
            “Students now easily find and reserve books from home!” – Mrs. Patil, Library Head, City College
          </blockquote>
        </section>

        <section className="aboutus-section contact-link">
          <h2> Get in Touch</h2>
          <p>
            Want to know more? Visit our <a href="/contact">Contact Us</a> page or write to us at <strong>info@lms.com</strong>
          </p>
        </section>
      </div>

      <footer className="aboutus-footer">
        © 2025 Library Management System. Built with  and  by passionate developers.
      </footer>
    </div>
  );
};

export default AboutUs;
