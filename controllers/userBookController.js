const db = require("../models");
const UserBook = db.UserBook;
const Book = db.Book;
const Sequelize = db.Sequelize;

exports.addUserBook = async (req, res) => {
  try {
    const { bookId, status, currentPage, startDate, finishDate } = req.body;
    const userBook = await UserBook.create({
      userId: req.user.userId,
      bookId,
      status,
      currentPage,
      startDate,
      finishDate,
    });
    res.status(201).json(userBook);
  } catch (err) {
    res.status(500).json({ message: "Error adding to reading list", error: err.message });
  }
};

exports.updateUserBook = async (req, res) => {
  try {
    const update = await UserBook.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Reading entry updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating entry", error: err.message });
  }
};

exports.deleteUserBook = async (req, res) => {
  try {
    await UserBook.destroy({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Book removed from list" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting entry", error: err.message });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = { userId: req.user.userId };
    if (status) whereClause.status = status;

    const userBooks = await UserBook.findAll({
      where: whereClause,
      include: [Book],
    });
    res.json(userBooks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reading list", error: err.message });
  }
};