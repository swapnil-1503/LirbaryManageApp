// backend/src/controllers/studentController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================
// Helper: Generate JWT
// ======================
const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || "secret", // fallback if JWT_SECRET missing
    { expiresIn: "1h" }
  );
};

// ======================
// Register Student
// ======================
exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Check if student already exists
    const [existing] = await db.query(
      "SELECT id FROM students WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert new student
    const [result] = await db.query(
      "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // 4. Generate token
    const token = generateToken(result.insertId, email);

    return res.status(201).json({
      message: "Student registered successfully",
      token,
      student: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (err) {
    console.error("Error in registerStudent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ======================
// Login Student
// ======================
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find student
    const [rows] = await db.query(
      "SELECT * FROM students WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const student = rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = generateToken(student.id, student.email);

    return res.json({
      message: "Login successful",
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (err) {
    console.error("Error in loginStudent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const [students] = await db.query("SELECT id, name, email, created_at FROM students");
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await db.query("UPDATE students SET name = ?, email = ? WHERE id = ?", [name, email, id]);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM students WHERE id = ?", [id]);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Server error" });
  }
};