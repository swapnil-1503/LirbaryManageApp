// backend/src/routes/studentRoutes.js
const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/studentController");
const studentController = require("../controllers/studentController");

const router = express.Router();

// Register student
router.post("/register", registerStudent);

// Login student
router.post("/login", loginStudent);

router.get("/", studentController.getAllStudents); // List all
router.put("/:id", studentController.updateStudent); // Update student
router.delete("/:id", studentController.deleteStudent); // Delete student

module.exports = router;
