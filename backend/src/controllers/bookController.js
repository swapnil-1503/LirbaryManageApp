// controllers/bookController.js
const Book = require("../models/bookModel");

const addBook = async (req, res) => {
  try {
    const { title, author, genre, published_year, isbn, quantity, available } = req.body;

    if (!title || !author || !isbn || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBookId = await Book.addBook({
      title,
      author,
      genre,
      published_year: published_year ? parseInt(published_year) : null,
      isbn,
      quantity: parseInt(quantity),
      available: available != null ? parseInt(available) : 1
    });

    res.status(201).json({ message: "Book added successfully", bookId: newBookId });
  } catch (err) {
    console.error("Error in addBook:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (err) {
    console.error("Error in getAllBooks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/bookController.js
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, published_year, isbn, quantity, available } = req.body;
    await Book.updateBook(id, { title, author, genre, published_year, isbn, quantity, available });
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteBook(id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { addBook, getAllBooks, updateBook, deleteBook };



