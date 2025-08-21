const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.post("/add", bookController.addBook);
router.get("/list", bookController.getAllBooks);
router.put("/:id", bookController.updateBook);     // for editing
router.delete("/:id", bookController.deleteBook);  // for deleting

module.exports = router;



