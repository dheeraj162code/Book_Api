const db = require("../models");
const Book = db.Book;
const Review = db.Review;
const User = db.User;

exports.searchBooks = async (req, res) => {
  const { search } = req.query;
  let searchText = search || "";
  try {
    const books = await Book.findAll({
      where: {
        title: { [db.Sequelize.Op.like]: `%${searchText}%` },
      },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error searching books", error: err.message });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId, {
      include: [
        {
          model: Review,
          include: [{ model: User, attributes: ["email"] }],
        },
      ],
    });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const avgRating = await Review.findAll({
      where: { bookId: req.params.bookId },
      attributes: [[db.Sequelize.fn("AVG", db.Sequelize.col("rating")), "avgRating"]],
    });

    res.json({ ...book.toJSON(), averageRating: avgRating[0].dataValues.avgRating });
  } catch (err) {
    res.status(500).json({ message: "Error fetching book details", error: err.message });
  }
};

exports.addBook = async (req, res) => {
    const { title, author, totalPages, genre } = req.body;
  
    if (!title || !author || !totalPages || !genre) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const newBook = await Book.create({
        title,
        author,
        totalPages,
        genre,
      });
  
      res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (err) {
      res.status(500).json({ message: "Error adding book", error: err.message });
    }
  };