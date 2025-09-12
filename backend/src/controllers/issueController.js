// backend/src/controllers/issueController.js
const db = require("../config/db");

// -------------------- Student Controllers --------------------

// Student requests a book
exports.requestBook = async (req, res) => {
  try {
    const student_id = req.user?.id;
    const { book_id } = req.body;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID missing in token" });
    }
    if (!book_id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    await db.query(
      "INSERT INTO issue_requests (student_id, book_id, status) VALUES (?, ?, 'pending')",
      [student_id, book_id]
    );

    return res.status(201).json({ message: "Book request submitted successfully" });
  } catch (err) {
    console.error("Error in requestBook:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Student fetches their requests
exports.getMyRequests = async (req, res) => {
  try {
    const student_id = req.user?.id;
    if (!student_id) {
      return res.status(400).json({ message: "Student ID missing in token" });
      console.log("Decoded user:", req.user);

    }

    const [rows] = await db.query(
      `SELECT ir.id, b.title, ir.status, ir.request_date
       FROM issue_requests ir
       JOIN books b ON ir.book_id = b.id
       WHERE ir.student_id = ?`,
      [student_id]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Error in getMyRequests:", err);
    return res.status(500).json({ message: "Server error", error: err });
    console.log("Decoded user:", req.user);

  }
};

// Student returns a book
exports.returnBook = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const student_id = req.user?.id;
    const { issue_id } = req.body;

    if (!student_id || !issue_id) {
      return res.status(400).json({ message: "student_id and issue_id are required" });
    }

    await connection.beginTransaction();

    // Verify issued book
    const [rows] = await connection.query(
      `SELECT ib.id, ib.book_id, ib.status, b.title
       FROM issued_books ib
       JOIN books b ON ib.book_id = b.id
       WHERE ib.id = ? AND ib.student_id = ? AND ib.status = 'issued' FOR UPDATE`,
      [issue_id, student_id]
    );

    if (!rows.length) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ message: "Issued book not found or already returned" });
    }

    const bookId = rows[0].book_id;

    // Update issued_books → returned
    await connection.query(
      `UPDATE issued_books 
       SET status = 'returned', return_date = NOW() 
       WHERE id = ?`,
      [issue_id]
    );

    // Increase stock
    await connection.query(
      `UPDATE books 
       SET quantity = quantity + 1, available = 1 
       WHERE id = ?`,
      [bookId]
    );

    await connection.commit();
    connection.release();

    return res.json({ message: `Book "${rows[0].title}" returned successfully` });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error("Error in returnBook:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// -------------------- Admin Controllers --------------------

// Admin: Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ir.id, s.name AS student_name, b.title, ir.status, ir.request_date
       FROM issue_requests ir
       JOIN students s ON ir.student_id = s.id
       JOIN books b ON ir.book_id = b.id
       ORDER BY ir.request_date DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error("Error in getAllRequests:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Admin: Approve a request
exports.approveRequest = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { id } = req.params;
    await connection.beginTransaction();

    const [reqRows] = await connection.query(
      `SELECT ir.student_id, ir.book_id, b.quantity, b.title
       FROM issue_requests ir
       JOIN books b ON ir.book_id = b.id
       WHERE ir.id = ? FOR UPDATE`,
      [id]
    );

    if (!reqRows.length) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ message: "Request not found" });
    }

    const r = reqRows[0];
    if (r.quantity <= 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ message: "Book not available to issue" });
    }

    await connection.query(
      "UPDATE issue_requests SET status = 'approved' WHERE id = ?",
      [id]
    );

    await connection.query(
      `INSERT INTO issued_books (student_id, book_id, issue_date, return_date, status)
       VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'issued')`,
      [r.student_id, r.book_id]
    );

    await connection.query(
      `UPDATE books 
       SET quantity = quantity - 1, available = CASE WHEN quantity - 1 > 0 THEN 1 ELSE 0 END
       WHERE id = ?`,
      [r.book_id]
    );

    await connection.commit();
    connection.release();

    return res.json({ message: `Request approved. "${r.title}" issued.` });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error("Error in approveRequest:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Admin: Reject a request
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      "UPDATE issue_requests SET status = 'rejected' WHERE id = ? AND status = 'pending'",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Request not found or not pending" });
    }

    return res.json({ message: "Request rejected successfully" });
  } catch (err) {
    console.error("Error in rejectRequest:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
