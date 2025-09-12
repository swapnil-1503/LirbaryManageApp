const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// 🔹 Admin only (protected + role check)
router.post("/add", verifyToken, requireRole("admin"), bookController.addBook);
router.put("/:id", verifyToken, requireRole("admin"), bookController.updateBook);
router.delete("/:id", verifyToken, requireRole("admin"), bookController.deleteBook);

// 🔹 Public
router.get("/list", bookController.getAllBooks);

// 🔹 Student protected routes
router.post("/issue", verifyToken, requireRole("student"), bookController.issueBook);
router.post("/return", verifyToken, requireRole("student"), bookController.returnBook);
router.get("/issued", verifyToken, requireRole("student"), bookController.getIssuedBooks);

module.exports = router;
