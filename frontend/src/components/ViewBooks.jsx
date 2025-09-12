import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/books/list");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook(book.id);
    setEditedBook({ ...book });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/books/${id}`, editedBook);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Genre</th><th>Year</th>
            <th>ISBN</th><th>Quantity</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              {editingBook === book.id ? (
                <>
                  <td><input value={editedBook.title} onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })} /></td>
                  <td><input value={editedBook.author} onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })} /></td>
                  <td><input value={editedBook.genre} onChange={(e) => setEditedBook({ ...editedBook, genre: e.target.value })} /></td>
                  <td><input value={editedBook.published_year} onChange={(e) => setEditedBook({ ...editedBook, published_year: e.target.value })} /></td>
                  <td><input value={editedBook.isbn} onChange={(e) => setEditedBook({ ...editedBook, isbn: e.target.value })} /></td>
                  <td><input value={editedBook.quantity} onChange={(e) => setEditedBook({ ...editedBook, quantity: e.target.value })} /></td>
                  <td>
                    <select value={editedBook.available} onChange={(e) => setEditedBook({ ...editedBook, available: e.target.value })}>
                      <option value="1">Available</option>
                      <option value="0">Not Available</option>
                    </select>
                  </td>
                  <td><button onClick={() => handleSave(book.id)}>Save</button></td>
                </>
              ) : (
                <>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.published_year}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td>{book.available ? "Available" : "Not Available"}</td>
                  <td>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button onClick={() => handleDelete(book.id)}>Delete</button>
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
