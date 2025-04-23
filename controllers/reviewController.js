const db = require("../models");
const Review = db.Review;

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, reviewText } = req.body;
    const review = await Review.create({
      userId: req.user.userId,
      bookId,
      rating,
      reviewText,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error adding review", error: err.message });
  }
};

exports.editReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const updated = await Review.update(
      { rating, reviewText },
      {
        where: {
          id: req.params.reviewId,
          userId: req.user.userId,
        },
      }
    );
    res.json({ message: "Review updated" });
  } catch (err) {
    res.status(500).json({ message: "Error editing review", error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.destroy({
      where: {
        id: req.params.reviewId,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err.message });
  }
};