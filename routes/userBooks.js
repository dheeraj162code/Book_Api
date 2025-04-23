const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const {
  addUserBook,
  updateUserBook,
  deleteUserBook,
  getUserBooks,
} = require("../controllers/userBookController");

router.use(authenticateJWT);

router.post("/", addUserBook);
router.put("/:id", updateUserBook);
router.delete("/:id", deleteUserBook);
router.get("/", getUserBooks);

module.exports = router;
