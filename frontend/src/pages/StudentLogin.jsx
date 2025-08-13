import React, { useState } from "react";
import StudentRegistration from "./StudentRegistration";

const StudentLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (username === "student" && password === "student") {
      onLogin();
    } else {
      setError("Invalid student Password ⚠️⚠️");
    }
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
  };

  if (isRegistering) {
    return <StudentRegistration onBackToLogin={handleBackToLogin} />;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Student Login</h3>
        <form onSubmit={handleStudentLogin}>
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
          <button type="submit" className="btn btn-success w-100">
            Login as Student
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={handleRegisterClick}
          >
            New Student? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
