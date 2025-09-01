// controllers/adminController.js
const db = require("../config/db");

// ✅ Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    // Total titles
    const [titles] = await db.query("SELECT COUNT(*) AS bookCount FROM books");

    // Total stock
    const [totalBooks] = await db.query("SELECT SUM(quantity) AS totalBooks FROM books");

    // Available books
    const [availableBooks] = await db.query("SELECT SUM(quantity) AS availableBooks FROM books WHERE quantity > 0");

    // Total users
    const [users] = await db.query("SELECT COUNT(*) AS totalUsers FROM students");

    // Total active issued books
    const [issued] = await db.query("SELECT COUNT(*) AS totalIssued FROM issued_books WHERE status='issued'");

    res.json({
      bookCount: titles[0].bookCount || 0,
      totalBooks: totalBooks[0].totalBooks || 0,
      availableBooks: availableBooks[0].availableBooks || 0,
      totalUsers: users[0].totalUsers || 0,
      totalIssued: issued[0].totalIssued || 0,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Recent Activity
const getRecentActivity = async (req, res) => {
  try {
    const [activity] = await db.query(`
      SELECT ib.id AS issue_id, b.title, s.name AS student_name,
             ib.status, ib.issue_date, ib.return_date
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN students s ON ib.student_id = s.id
      ORDER BY ib.issue_date DESC
      LIMIT 10
    `);

    res.json(activity);
  } catch (err) {
    console.error("Error fetching recent activity:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats, getRecentActivity };
