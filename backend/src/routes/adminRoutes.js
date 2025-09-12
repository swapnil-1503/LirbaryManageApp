// backend/src/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Admin login
router.post("/login", adminController.login);

// Dashboard stats - admin only
router.get("/stats", verifyToken, requireRole("admin"), adminController.getDashboardStats);

// Recent activity - admin only
router.get("/recent-activity", verifyToken, requireRole("admin"), adminController.getRecentActivity);

module.exports = router;
