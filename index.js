// book_review_app_backend/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const userBookRoutes = require("./routes/userBooks");
const reviewRoutes = require("./routes/reviews");
const statsRoutes = require("./routes/stats");
const { authenticateJWT } = require("./middleware/authMiddleware");
const db = require("./models");

dotenv.config({ path: '.env.local' });
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", authenticateJWT, bookRoutes);
app.use("/api/user-books", authenticateJWT, userBookRoutes);
app.use("/api/reviews", authenticateJWT, reviewRoutes);
app.use("/api/stats", authenticateJWT, statsRoutes);

// Sync DB and Start Server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
});
