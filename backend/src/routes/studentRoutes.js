// backend/src/routes/studentRoutes.js
const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/studentController");
const studentController = require("../controllers/studentController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

// public
router.post("/register", registerStudent);
router.post("/login", loginStudent);

// admin-only
router.get("/", verifyToken, requireRole("admin"), studentController.getAllStudents);
router.put("/:id", verifyToken, requireRole("admin"), studentController.updateStudent);
router.delete("/:id", verifyToken, requireRole("admin"), studentController.deleteStudent);
// Example route
router.get("/profile", verifyToken, requireRole("student"), studentController.getProfile);
router.post("/request", verifyToken, requireRole("student"), studentController.requestBook);
router.get("/issued", verifyToken, requireRole("student"), studentController.getIssuedBooks);
module.exports = router;
