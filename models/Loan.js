const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Loan = sequelize.define("Loan", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  loanDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  dueDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Emprestado",
  },
  loanStatus: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Em curso",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  exemplaryId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});

module.exports = Loan;
