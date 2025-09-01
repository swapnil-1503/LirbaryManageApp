import React, { useState } from "react";
import axios from "axios";
import bgImage from "../images/studentrbg.jpg"; // ✅ Import image
import "./StudentRegistration.css"; // ✅ Import CSS

const StudentRegistration = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    roll_number: "",
    course: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students/register", student);
      setMsg("✅ Registration successful! Please login.");
    } catch (err) {
      setMsg("❌ Error: " + err.response?.data?.message);
    }
  };

  return (
    <div
      className="registration-container"
      style={{
        backgroundImage: `url(${bgImage})`,  // ✅ Set imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="registration-box">
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input name="roll_number" placeholder="Roll Number" onChange={handleChange} required />
          <input name="course" placeholder="Course" onChange={handleChange} required />
          <button type="submit" className="register-btn">Register</button>
        </form>
        {msg && (
          <p className={`message-text ${msg.startsWith("✅") ? "success" : "error"}`}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentRegistration;
