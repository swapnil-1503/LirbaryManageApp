// models/book.js
const db = require("../db");

const Book = {
  // Add a new book
  addBook: async ({ title, author, genre, published_year, isbn, quantity, available }) => {
    const sql = `
      INSERT INTO books (title, author, genre, published_year, isbn, quantity, available)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    console.log("Executing SQL:", sql);
    console.log("Values:", [title, author, genre, published_year, isbn, quantity, available]);
    const [result] = await db.execute(sql, [title, author, genre, published_year, isbn, quantity, available]);
    console.log("Insert result:", result);
    return result.insertId;
  },

  // Get all books
  getAllBooks: async () => {
    const [rows] = await db.execute("SELECT * FROM books");
    return rows;
  },

  // Update a book by id
  updateBook: async (id, { title, author, genre, published_year, isbn, quantity, available }) => {
    const sql = `
      UPDATE books
      SET title=?, author=?, genre=?, published_year=?, isbn=?, quantity=?, available=?
      WHERE id=?
    `;
    const [result] = await db.execute(sql, [title, author, genre, published_year, isbn, quantity, available, id]);
    return result.affectedRows;
  },

  // Delete a book by id
  deleteBook: async (id) => {
    const sql = `DELETE FROM books WHERE id=?`;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = Book;
