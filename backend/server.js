// server.js (CommonJS, works with plain `node server.js`)
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// Create pool (no await here)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",       // <--- put your MySQL password, if any
  database: "library" // <--- must exist (we create in step 3)
});

// Health check
app.get("/", (req, res) => res.send("API OK"));

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT user_id AS id, name, email, role FROM users");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error while fetching users" });
  }
});

// ADD user
app.post("/api/users/add", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );
    res.status(201).json({ message: "User added" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error while adding user" });
  }
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE user_id = ?", [req.params.id]);
    res.json({ message: "User deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB error while deleting user" });
  }
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
