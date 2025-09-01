import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  // ---------------- Auth headers ----------------
  const getAuthHeaders = () => {
    const token = localStorage.getItem("studentToken"); // token from login
    return { Authorization: `Bearer ${token}` };
  };

  // ---------------- Fetch all books ----------------
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books/list", {
        headers: getAuthHeaders(),
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // ---------------- Fetch issued books ----------------
  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/books/issued", // no studentId needed
        { headers: getAuthHeaders() }
      );
      setIssuedBooks(res.data);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    }
  };

  // ---------------- Issue a Book ----------------
  const handleIssue = async (bookId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/books/issue",
        { book_id: bookId }, // student_id taken from token in backend
        { headers: getAuthHeaders() }
      );
      alert("Book issued successfully!");
      fetchBooks();
      fetchIssuedBooks();
    } catch (err) {
      console.error("Error issuing book:", err);
      alert(err.response?.data?.message || "Failed to issue book");
    }
  };

  // ---------------- Return a Book ----------------
  const handleReturn = async (issueId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/books/return",
        { issue_id: issueId },
        { headers: getAuthHeaders() }
      );
      alert("Book returned successfully!");
      fetchBooks();
      fetchIssuedBooks();
    } catch (err) {
      console.error("Error returning book:", err);
      alert(err.response?.data?.message || "Failed to return book");
    }
  };

  // ---------------- Fetch data on mount ----------------
  useEffect(() => {
    fetchBooks();
    fetchIssuedBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📖 Available Books</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Available Quantity</th>
            <th>Action</th>
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
                    onClick={() => handleIssue(book.id)}
                  >
                    Issue
                  </button>
                ) : (
                  <span className="text-danger">Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-5 mb-4">📚 My Issued Books</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Issued On</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((ib) => (
            <tr key={ib.issue_id}>
              <td>{ib.title}</td>
              <td>{ib.author}</td>
              <td>{new Date(ib.issue_date).toLocaleDateString()}</td>
              <td>{new Date(ib.return_date).toLocaleDateString()}</td>
              <td>
                {ib.status === "issued" ? (
                  <span className="badge bg-warning">Issued</span>
                ) : (
                  <span className="badge bg-success">Returned</span>
                )}
              </td>
              <td>
                {ib.status === "issued" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleReturn(ib.issue_id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;