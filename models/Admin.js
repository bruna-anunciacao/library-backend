const { DataTypes } = require("sequelize");
const sequelize = require('../db/conn');

const Admin = sequelize.define("Admin", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    }
});

module.exports = Admin;