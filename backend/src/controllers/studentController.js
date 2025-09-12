// backend/src/controllers/studentController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Register Student
// ==========================
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists
    const [existing] = await db.query("SELECT id FROM students WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO students (name, email, password, role) VALUES (?, ?, ?, 'student')",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error("Error in registerStudent:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Login Student
// ==========================
// ==========================
// Login Student
// ==========================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Fetch student
    const [rows] = await db.query("SELECT * FROM students WHERE email = ?", [email]);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const student = rows[0]; // ✅ rows[0] is the student record

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: student.id, email: student.email, role: student.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: student.role
      }
    });
  } catch (err) {
    console.error("Error in loginStudent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin-only: Get all students
// ==========================
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email, role FROM students");
    return res.json(rows);
  } catch (err) {
    console.error("Error in getAllStudents:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin-only: Update student
// ==========================
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    await db.query(
      "UPDATE students SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, id]
    );
    return res.json({ message: "Student updated successfully" });
  } catch (err) {
    console.error("Error in updateStudent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Admin-only: Delete student
// ==========================
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM students WHERE id = ?", [id]);
    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error in deleteStudent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Student: Get profile
// ==========================
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role FROM students WHERE id = ?",
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error("Error in getProfile:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Student: Request a book
// ==========================
exports.requestBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    await db.query(
      "INSERT INTO book_requests (student_id, book_id, status) VALUES (?, ?, 'pending')",
      [req.user.id, bookId]
    );

    return res.status(201).json({ message: "Book request submitted" });
  } catch (err) {
    console.error("Error in requestBook:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// Student: Get issued books
// ==========================
exports.getIssuedBooks = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.id, b.title, b.author, ib.issue_date, ib.return_date
       FROM issued_books ib
       JOIN books b ON ib.book_id = b.id
       WHERE ib.student_id = ?`,
      [req.user.id]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Error in getIssuedBooks:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
