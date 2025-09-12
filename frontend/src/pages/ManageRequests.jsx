import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch all book issue requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("/issues"); // axiosInstance adds token automatically
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      alert("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve a request
  const approve = async (id) => {
    if (!id) return console.error("Invalid issue ID");
    if (!window.confirm("Approve and issue this book?")) return;

    try {
      await axios.put(`/issues/${id}/approve`);
      alert("Approved and issued successfully");
      fetchRequests();
    } catch (err) {
      console.error("Error approving request:", err);
      alert(err.response?.data?.message || "Failed to approve request");
    }
  };

  // Reject a request
  const reject = async (id) => {
    if (!id) return console.error("Invalid issue ID");
    if (!window.confirm("Reject this request?")) return;

    try {
      await axios.put(`/issues/${id}/reject`);
      alert("Request rejected successfully");
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert(err.response?.data?.message || "Failed to reject request");
    }
  };

  return (
    <div>
      <h2>Manage Book Requests</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Book</th>
            <th>Student</th>
            <th>Status</th>
            <th>Requested On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.title}</td>
              <td>
                {r.student_name} ({r.student_email})
              </td>
              <td>{r.status}</td>
              <td>{new Date(r.issue_date).toLocaleString()}</td>
              <td>
                {r.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => approve(r.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => reject(r.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>{r.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
