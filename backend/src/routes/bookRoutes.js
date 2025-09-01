// const express = require("express");
// const router = express.Router();
// const bookController = require("../controllers/bookController");
// const authMiddleware = require("../middleware/authMiddleware"); // adjust path

// router.post("/add", bookController.addBook); // Admin only
// router.get("/list", bookController.getAllBooks);

// router.put("/:id", bookController.updateBook);
// router.delete("/:id", bookController.deleteBook);

// router.post("/issue", authMiddleware, bookController.issueBook);
// router.post("/return", authMiddleware, bookController.returnBook);

// // ✅ Updated: get issued books for logged-in student
// router.get("/issued", authMiddleware, bookController.getIssuedBooks);

// module.exports = router;



const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔹 Admin only (you can add role check later)
router.post("/add", bookController.addBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

// 🔹 Public
router.get("/list", bookController.getAllBooks);

// 🔹 Student protected routes
router.post("/issue", authMiddleware, bookController.issueBook);
router.post("/return", authMiddleware, bookController.returnBook);
router.get("/issued", authMiddleware, bookController.getIssuedBooks);

module.exports = router;
