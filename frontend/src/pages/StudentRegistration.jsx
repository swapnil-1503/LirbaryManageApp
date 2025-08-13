import React, { useState } from "react";

const StudentRegistration = ({ onBackToLogin }) => {
  // Existing state for name and password
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  // New state variable for username
  const [username, setUsername] = useState("");
  
  // New state variables for email, contact, and address
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // This is where you would typically make an API call to register the student.
    // The data object now includes all the new fields, with username instead of roll.
    console.log("Registering student:", {
      name,
      username,
      email,
      contact,
      address,
      password,
    });
    
    // In a real app, you would navigate away after a successful API response.
    // For this example, we'll go back to the login screen.
    console.log("Registration submitted successfully! You can now log in.");
    onBackToLogin(); 
  };

  return (
    <div className="card p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="text-center">Student Registration</h3>
      <form onSubmit={handleRegistrationSubmit}>
        {/* Full Name field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* New Username field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Email field */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Contact field */}
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        {/* Address field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        {/* Password field */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-link" onClick={onBackToLogin}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default StudentRegistration;

