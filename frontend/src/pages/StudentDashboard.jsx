import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);

  // ------------------- Fetch all books -------------------
  const fetchBooks = async () => {
    try {
      const res = await axios.get("/books/list"); // token auto-included in axiosInstance
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      alert("Failed to fetch books");
    }
  };

  // ------------------- Fetch my requests -------------------
  const fetchMyRequests = async () => {
    try {
      const res = await axios.get("/issues/my"); // token auto-included
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching my requests:", err);
      alert(err.response?.data?.message || "Failed to fetch requests");
    }
  };

  // ------------------- Request a book -------------------
  const handleRequest = async (bookId) => {
    if (!bookId) return alert("Invalid book ID");

    try {
      console.log("Requesting book with book_id:", bookId);
      await axios.post("/issues/request", { book_id: bookId });
      alert("Request submitted. Wait for admin approval.");
      fetchMyRequests();
    } catch (err) {
      console.error("Error requesting book:", err);
      alert(err.response?.data?.message || "Request failed");
    }
  };

  // ------------------- Return a book -------------------
  const handleReturn = async (issueId) => {
    if (!issueId) return alert("Invalid issue ID");

    try {
      await axios.post("/books/return", { issue_id: issueId });
      alert("Book returned successfully!");
      fetchBooks();
      fetchMyRequests();
    } catch (err) {
      console.error("Error returning book:", err);
      alert(err.response?.data?.message || "Failed to return book");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMyRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Books</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Genre</th><th>Qty</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.quantity}</td>
              <td>
                {book.quantity > 0 ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRequest(book.id)}
                  >
                    Request
                  </button>
                ) : (
                  <span className="text-danger">Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-5">My Requests / Issued Books</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th><th>Requested On</th><th>Issued On</th><th>Return Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.issue_id}>
              <td>{r.title}</td>
              <td>{r.request_date ? new Date(r.request_date).toLocaleDateString() : "-"}</td>
              <td>{r.issue_date ? new Date(r.issue_date).toLocaleDateString() : "-"}</td>
              <td>{r.return_date ? new Date(r.return_date).toLocaleDateString() : "-"}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "issued" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleReturn(r.issue_id)}
                  >
                    Return
                  </button>
                )}
                {r.status === "pending" && <span className="text-warning">Pending</span>}
                {r.status === "rejected" && <span className="text-danger">Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
