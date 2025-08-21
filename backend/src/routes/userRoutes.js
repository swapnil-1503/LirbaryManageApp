const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/add", userController.addUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
