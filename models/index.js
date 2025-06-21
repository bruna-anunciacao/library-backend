const sequelize = require('../db/conn');

const User = require('./User');
const Book = require('./Book');
const Exemplary = require('./Exemplary');
const Loan = require('./Loan');

require('./Associations');

module.exports = { sequelize, User, Book, Exemplary, Loan };