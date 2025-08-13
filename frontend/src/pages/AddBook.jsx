import React, { useState } from "react";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
    isbn: "",
    quantity: "",
    available: "1", // Default: Available
  });

  const [message, setMessage] = useState("");

  // Update state when input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          genre: book.genre,
          published_year: book.published_year
            ? parseInt(book.published_year)
            : null,
          isbn: book.isbn,
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
      setMessage(
        "Failed to add book. Make sure the backend server is running."
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            value={book.genre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Published Year</label>
          <input
            type="number"
            className="form-control"
            name="published_year"
            value={book.published_year}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>ISBN</label>
          <input
            type="text"
            className="form-control"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Availability</label>
          <select
            className="form-control"
            name="available"
            value={book.available}
            onChange={handleChange}
            required
          >
            <option value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
