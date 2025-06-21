const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Book = sequelize.define("Book", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edition: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
  },
});

module.exports = Book