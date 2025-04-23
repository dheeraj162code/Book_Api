const db = require("../models");
const { UserBook, Book, Review, Sequelize } = db;

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalBooksRead = await UserBook.count({
      where: { userId, status: "Completed" },
    });

    const averageRating = await Review.findAll({
      where: { userId },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]],
    });

    const pagesPerMonth = await UserBook.findAll({
      where: { userId },
      include: [Book],
    });

    const monthlyPages = {};
    pagesPerMonth.forEach(entry => {
      if (entry.status === "Completed" && entry.startDate && entry.finishDate) {
        const month = new Date(entry.finishDate).toLocaleString("default", { month: "long", year: "numeric" });
        monthlyPages[month] = (monthlyPages[month] || 0) + entry.Book.totalPages;
      }
    });

    res.json({
      totalBooksRead,
      averageRating: averageRating[0].dataValues.avgRating,
      pagesPerMonth: monthlyPages,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
};


