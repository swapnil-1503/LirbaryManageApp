import React, { useState } from "react";

const StudentLogin = ({ onLogin }) => {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (roll === "student" && password === "student") {
      onLogin();
    } else {
      setError("Invalid student credentials");
    }
  };

  return (
    <div className="card p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
      <h3 className="text-center">Student Login</h3>
      <form onSubmit={handleStudentLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Roll No"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
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
        <button type="submit" className="btn btn-success w-100">Login as Student</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default StudentLogin;
