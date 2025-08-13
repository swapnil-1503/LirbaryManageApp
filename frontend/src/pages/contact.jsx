import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="full-page">
    <div className="contact-container">
      <h1>📞 Contact Us</h1>

      <p className="intro">
        Got questions or feedback about our Library Management System? We'd love to hear from you.
      </p>

      <div className="contact-sections">
        {/* Contact Information Section */}
        <div className="contact-info">
          <h3>📍 Visit Us</h3>
          <p><strong>Address:</strong> MQ59+78M, Sector 25, Pradhikaran, PMPML Bus Stop, Nigdi, Pimpri-Chinchwad, Maharashtra 411044</p>
          <p><strong>Phone:</strong> 📱 +91 9529836266</p>
          <p><strong>Email:</strong> 📧 support@librarysystem.com</p>
          <p><strong>Working Hours:</strong> ⏰🔓 24 Hours Open.....</p>
        </div>

        {/* Feedback Form */}
        <div className="contact-form">
          <h3>✍️ Send Us a Message</h3>
          <form>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your Name" required />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Your Email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your Message" rows="5" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Support Info Section */}
      <div className="support-section">
        <h3>💬 Support & Feedback</h3>
        <p>
          Whether you're facing issues with login, book borrowing, or any other feature,
          our team is just an email or call away. Your feedback also helps us improve!
        </p>
        <p>
          <strong>Support Email:</strong> support@librarysystem.com<br />
          <strong>WhatsApp:</strong> +91 9529836266
        </p>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h3>📌 Our Location</h3>
        <iframe
          title="Library Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14847.890324230919!2d73.75490560789349!3d18.65883446708142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b959e9a00a37%3A0x29cff05a23603b1b!2sSwatntryveer%20Savarkar%20Studyroom-%20Abhyasika%20Nigdi!5e0!3m2!1sen!2sin!4v1754398224901!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <footer className="footer">© 2025 Library Management System. All rights reserved.</footer>
    </div>
    </div>
  );
};

export default Contact;
