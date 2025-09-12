import React, { useState } from "react";
import axios from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "./StudentLogin.css"; // ✅ Import CSS
import bgImage from "../images/studentbg.jpg"; // ✅ Import background image (adjust path)

const StudentLogin = ({ onLogin }) => {
  const [student, setStudent] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        student
      );

      // Save token + student info
      localStorage.setItem("studentToken", res.data.token);
      localStorage.setItem("studentId", res.data.student.id);

      onLogin();
      navigate("/student/dashboard");
    } catch (err) {
      setMsg("Error: " + err.response?.data?.message);
    }
  };

  return (
    <div
      className="student-login-container"
      style={{
        backgroundImage: `url(${bgImage})`, // ✅ Set imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="login-box">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signin-btn">Login</button>
        </form>

        {msg && <p className="error-text">{msg}</p>}

        <p className="register-link">
          Don’t have an account?{" "}
          <Link to="/student/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
