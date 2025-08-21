import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // change once you add a proxy
  // withCredentials: true, // enable only if you use cookies/sessions
});

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Student" });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const normalizeUsers = (data) => {
    // Handle: array or {users: []}, id or user_id
    const arr = Array.isArray(data) ? data : data?.users || [];
    return arr.map((u) => ({
      id: u.id ?? u.user_id, // support both shapes
      name: u.name,
      email: u.email,
      role: u.role,
    }));
  };

  const fetchUsers = async () => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await api.get("/api/users");
      console.log("GET /api/users ->", res.status, res.data);
      setUsers(normalizeUsers(res.data));
    } catch (err) {
      console.error("Error fetching users:", err?.response?.status, err?.response?.data || err.message);
      setErrMsg(
        err?.response?.data?.error ||
        err?.message ||
        "Failed to fetch users. Check backend & CORS."
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddUser = async () => {
    setErrMsg("");
    try {
      const res = await api.post("/api/users/add", form);
      console.log("POST /api/users/add ->", res.status, res.data);
      await fetchUsers();
      setForm({ name: "", email: "", password: "", role: "Student" });
    } catch (err) {
      console.error("Error adding user:", err?.response?.status, err?.response?.data || err.message);
      setErrMsg(err?.response?.data?.error || "Failed to add user.");
    }
  };

  const handleDelete = async (id) => {
    setErrMsg("");
    try {
      const res = await api.delete(`/api/users/${id}`);
      console.log(`DELETE /api/users/${id} ->`, res.status, res.data);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err?.response?.status, err?.response?.data || err.message);
      setErrMsg(err?.response?.data?.error || "Failed to delete user.");
    }
  };

  return (
    <div className="manage-users-page container mt-5">
      <h2 className="text-center mb-4">Manage Users</h2>

      {errMsg && (
        <div className="alert alert-danger" role="alert">
          {errMsg}
        </div>
      )}

      {/* Add User Form */}
      <div className="card p-3 mb-4">
        <h5>Add New User</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input className="form-control" type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            {/* Bootstrap 5 prefers form-select, but form-control works too */}
            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="col-md-1">
            <button className="btn btn-success w-100" onClick={handleAddUser} disabled={loading}>
              {loading ? "..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5" className="text-center">Loading...</td></tr>
          ) : users.length ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center">No users available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
