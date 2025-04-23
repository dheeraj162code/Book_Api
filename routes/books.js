const express = require("express");
const router = express.Router();
const { searchBooks, getBookDetails, addBook } = require("../controllers/bookController");

router.get("/", searchBooks);
router.get("/:bookId", getBookDetails);
router.post("/", addBook )

module.exports = router;