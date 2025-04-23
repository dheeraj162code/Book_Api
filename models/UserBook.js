module.exports = (sequelize, DataTypes) => {
    const UserBook = sequelize.define("UserBook", {
      status: {
        type: DataTypes.ENUM("To Read", "Reading", "Completed", "Dropped"),
        allowNull: false,
      },
      currentPage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      finishDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
    return UserBook;
  };