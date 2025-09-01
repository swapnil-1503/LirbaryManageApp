// controllers/bookController.js
const Book = require("../models/bookModel");
const db = require("../config/db");
const { sendEmail } = require("../utils/emailService");

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

// ---------------- Issue Book ----------------
const issueBook = async (req, res) => {
  try {
    const { student_id, book_id, student_email } = req.body;

    // check availability
    const [book] = await db.query("SELECT title, quantity FROM books WHERE id = ?", [book_id]);
    if (!book.length || book[0].quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // insert issue record
    const [result] = await db.query(
      `INSERT INTO issued_books (student_id, book_id, issue_date, return_date, status)
       VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'issued')`,
      [student_id, book_id]
    );

    // decrease stock
    await db.query("UPDATE books SET quantity = quantity - 1 WHERE id = ?", [book_id]);

    // send email notification
    if (student_email) {
      await sendEmail(
        student_email,
        "Library Book Issued",
        `You have issued "${book[0].title}". Please return it within 7 days.`
      );
    }

    res.json({ message: "Book issued successfully for 7 days", issueId: result.insertId });
  } catch (err) {
    console.error("Error issuing book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Return Book ----------------
const returnBook = async (req, res) => {
  try {
    const { issue_id, student_email } = req.body;

    // get issued record
    const [issued] = await db.query(
      "SELECT ib.book_id, ib.status, b.title FROM issued_books ib JOIN books b ON ib.book_id = b.id WHERE ib.id = ?",
      [issue_id]
    );

    if (!issued.length || issued[0].status === "returned") {
      return res.status(400).json({ message: "Invalid issue record" });
    }

    const bookId = issued[0].book_id;

    // update issued_books
    await db.query("UPDATE issued_books SET status = 'returned' WHERE id = ?", [issue_id]);

    // restore stock
    await db.query("UPDATE books SET quantity = quantity + 1 WHERE id = ?", [bookId]);

    // send email notification
    if (student_email) {
      await sendEmail(
        student_email,
        "Library Book Returned",
        `You have successfully returned "${issued[0].title}". Thank you!`
      );
    }

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    console.error("Error returning book:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Get Issued Books ---------------
// ---------------- New: Get Issued Books ----------------
const getIssuedBooks = async (req, res) => {
  try {
    const student_id = req.user.id; // 🔹 get from token
    const [issuedBooks] = await db.query(
      `SELECT ib.id as issue_id, b.title, b.author, ib.issue_date, ib.return_date, ib.status
       FROM issued_books ib
       JOIN books b ON ib.book_id = b.id
       WHERE ib.student_id = ?`,
      [student_id]
    );

    res.json(issuedBooks);
  } catch (err) {
    console.error("Error fetching issued books:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { 
  addBook, 
  getAllBooks, 
  updateBook, 
  deleteBook,
  issueBook,
  returnBook,
  getIssuedBooks
};
