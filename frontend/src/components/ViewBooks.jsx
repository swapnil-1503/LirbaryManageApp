import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books/list");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input change during edit
  const handleChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  // Start editing a book
  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setEditedBook({ ...book }); // populate form with existing values
  };

  // Save edited book
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, editedBook);
      setEditingBookId(null);
      fetchBooks(); // refresh list
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete a book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks(); // refresh list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2>View Books</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              {editingBookId === book.id ? (
                <>
                  <td><input name="title" value={editedBook.title} onChange={handleChange} /></td>
                  <td><input name="author" value={editedBook.author} onChange={handleChange} /></td>
                  <td><input name="genre" value={editedBook.genre} onChange={handleChange} /></td>
                  <td><input name="published_year" type="number" value={editedBook.published_year} onChange={handleChange} /></td>
                  <td><input name="isbn" value={editedBook.isbn} onChange={handleChange} /></td>
                  <td><input name="quantity" type="number" value={editedBook.quantity} onChange={handleChange} /></td>
                  <td>
                    <select name="available" value={editedBook.available} onChange={handleChange}>
                      <option value={1}>Available</option>
                      <option value={0}>Not Available</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => handleSave(book.id)}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingBookId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.published_year}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>Delete</button>
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

export default ViewBooks;
