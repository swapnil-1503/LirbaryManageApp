import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-wrapper">
      <header className="services-header">
        <h1>Our Library Services</h1>
        <p className="tagline">Empowering Libraries with Modern Technology</p>
      </header>

      <section className="services-intro">
        <p>
          Our Library Management System is crafted to streamline everyday
          operations—from book lending to data reporting—making it easier for
          students, faculty, and administrators to focus on what truly matters:
          knowledge and learning.
        </p>
      </section>

      <section className="service-grid">
        {[
          {
            title: "Book Lending & Returns",
            desc: "Easily borrow and return books with automated due date tracking and reminders.",
          },
          {
            title: "Digital Catalog",
            desc: "Browse our library’s entire collection of books, journals, and e-resources.",
          },
          {
            title: "User Account Management",
            desc: "Students and faculty can track borrowed items, history, and fine payments.",
          },
          {
            title: "Admin Dashboard",
            desc: "Manage inventory, users, reservations, and overdue reports seamlessly.",
          },
          {
            title: "Reservation System",
            desc: "Pre-book titles and receive alerts when books become available.",
          },
          {
            title: "Fine Calculation",
            desc: "Automatic fine calculation system with instant notification to users.",
          },
          {
            title: "Reporting & Analytics",
            desc: "Generate reports on usage, book trends, overdue stats, and user engagement.",
          },
          {
            title: "Multi-User Access",
            desc: "Secure logins for admin, students, and staff with role-based access.",
          },
          {
            title: "24x7 Access",
            desc: "Digital services and catalog accessible online anytime, anywhere.",
          },
          {
            title: "Mobile Friendly",
            desc: "Our system is fully responsive and accessible on all screen sizes.",
          },
        ].map((service, idx) => (
          <div key={idx} className="service-box">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </section>

      <footer className="services-footer">
        <p>© 2025 Library Management System — Empowering Libraries Digitally.</p>
      </footer>
    </div>
  );
};

export default Services;
