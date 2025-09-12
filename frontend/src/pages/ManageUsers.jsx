import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";

const ManageUsers = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setForm({ ...student });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/students/${id}`, form);
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div>
      <h2>Manage Students</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {editingStudent === s.id ? (
                <>
                  <td><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                  <td><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                  <td><button onClick={() => handleSave(s.id)}>Save</button></td>
                </>
              ) : (
                <>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <button onClick={() => handleEdit(s)}>Edit</button>
                    <button onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
