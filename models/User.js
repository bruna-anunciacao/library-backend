const { DataTypes } = require("sequelize");
const sequelize = require('../db/conn');

const User = sequelize.define("User", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    type: {
        type: DataTypes.ENUM('Admin', 'Aluno Graduação', 'Aluno Pós Graduação', 'Professor'),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loanLimit: {
        type: DataTypes.INTEGER,
    },
    numberLoans: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    loanDueDate: {
        type: DataTypes.INTEGER,
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

module.exports = User;