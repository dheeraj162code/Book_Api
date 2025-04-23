const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const { getRecommendations } = require("../controllers/statsController");

// Protect routes with JWT auth
router.use(authenticateJWT);

// GET /api/recommendations
router.get("/", getRecommendations);

module.exports = router;