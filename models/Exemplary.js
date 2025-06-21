const { DataTypes } = require("sequelize");
const sequelize = require('../db/conn');

const Exemplary = sequelize.define("Exemplary", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    bookId: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    status: {
        type: DataTypes.STRING,
    },
    loanId: {
        type: DataTypes.UUID,
    }
})

module.exports = Exemplary;