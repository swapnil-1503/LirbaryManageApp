// backend/src/routes/issueRoutes.js
const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// ---------------- Student Endpoints ----------------
router.post("/request", verifyToken, requireRole("student"), issueController.requestBook);
router.get("/my", verifyToken, requireRole("student"), issueController.getMyRequests);
router.post("/return", verifyToken, requireRole("student"), issueController.returnBook); // ✅ return book

// ---------------- Admin Endpoints ----------------
router.get("/", verifyToken, requireRole("admin"), issueController.getAllRequests);
router.put("/:id/approve", verifyToken, requireRole("admin"), issueController.approveRequest);
router.put("/:id/reject", verifyToken, requireRole("admin"), issueController.rejectRequest);

module.exports = router;
