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
    bookCode: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    loanId: {
        allowNull: false,
        type: DataTypes.UUID,
    }
})

module.exports = Exemplary;