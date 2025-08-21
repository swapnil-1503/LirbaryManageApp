import React, { useState } from "react";

const StudentRegistration = ({ onBackToLogin }) => {
  // State variables
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log("Registering student:", {
      name,
      username,
      email,
      contact,
      address,
      password,
    });
    console.log("Registration submitted successfully! You can now log in.");
    onBackToLogin();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #ffdde1, #ee9ca7)",
      }}
    >
      <div
        className="card p-4 mx-auto"
        style={{
          width: "30%",        // responsive width
          maxWidth: "800px",   // long form on larger screens
          borderRadius: "12px",
          color: "black",
          backgroundColor: "transparent", // solid white for readability

          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
        }}
      >
        <h3 className="text-center mb-4">Student Registration</h3>
        <form onSubmit={handleRegistrationSubmit}>
          {/* Full Name */}
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

          {/* Username */}
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

          {/* Email */}
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

          {/* Contact */}
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

          {/* Address */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        {/* Back to Login Button */}
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={onBackToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
