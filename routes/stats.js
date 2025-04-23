const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const { getStats } = require("../controllers/statsController");

router.use(authenticateJWT);

router.get("/", getStats);

module.exports = router;