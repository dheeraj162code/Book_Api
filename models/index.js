// book_review_app_backend/models/index.js

const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );


const sequelize = new Sequelize(
    "bookapi",
    "root",
    "root",
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, DataTypes);
db.Book = require("./Book")(sequelize, DataTypes);
db.UserBook = require("./UserBook")(sequelize, DataTypes);
db.Review = require("./Review")(sequelize, DataTypes);

// Associations
db.User.hasMany(db.UserBook);
db.UserBook.belongsTo(db.User);

db.Book.hasMany(db.UserBook);
db.UserBook.belongsTo(db.Book);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Book.hasMany(db.Review);
db.Review.belongsTo(db.Book);

module.exports = db;
