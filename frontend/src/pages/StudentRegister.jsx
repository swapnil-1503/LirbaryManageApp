import React, { useState } from "react";
import axios from "axios";

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
      const res = await axios.post(
        "http://localhost:5000/api/students/register",
        student
      );
      setMsg("✅ Registration successful! Please login.");
    } catch (err) {
      setMsg("❌ Error: " + err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        name="roll_number"
        placeholder="Roll Number"
        onChange={handleChange}
      />
      <input name="course" placeholder="Course" onChange={handleChange} />
      <button type="submit">Register</button>
      <p>{msg}</p>
    </form>
  );
};

export default StudentRegistration;
