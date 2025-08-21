import React, { useState } from "react";
import "./AddBook.css";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
    isbn: "",
    quantity: "",
    available: "1",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/books/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...book,
          published_year: book.published_year
            ? parseInt(book.published_year)
            : null,
          quantity: parseInt(book.quantity),
          available: parseInt(book.available),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to add book");
        return;
      }
      setMessage(data.message);

      // Reset form
      setBook({
        title: "",
        author: "",
        genre: "",
        published_year: "",
        isbn: "",
        quantity: "",
        available: "1",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Failed to add book. Make sure backend is running.");
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-card">
        <h2>Add New Book</h2>
        {message && <div className="alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Published Year</label>
            <input
              type="number"
              name="published_year"
              value={book.published_year}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={book.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Availability</label>
            <select
              name="available"
              value={book.available}
              onChange={handleChange}
              required
            >
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
