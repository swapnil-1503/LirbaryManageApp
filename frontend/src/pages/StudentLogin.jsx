import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = ({ onLogin }) => {
  const [student, setStudent] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ Add navigation

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/students/login", student);

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
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <p>{msg}</p>

      <p>
        Don’t have an account? <Link to="/student/register">Register here</Link>
      </p>
    </form>
  );
};

export default StudentLogin;
