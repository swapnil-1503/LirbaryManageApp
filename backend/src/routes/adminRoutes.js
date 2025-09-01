const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Dashboard stats
router.get("/stats", authMiddleware, adminController.getDashboardStats);

// Recent activity
router.get("/recent-activity", authMiddleware, adminController.getRecentActivity);

module.exports = router;
