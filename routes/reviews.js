const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const {
  addReview,
  editReview,
  deleteReview,
} = require("../controllers/reviewController");

router.use(authenticateJWT);

router.post("/", addReview);
router.put("/:reviewId", editReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;