const sequelize = require('../db/conn');

const User = require('./User');
const Book = require('./Book');
const Exemplary = require('./Exemplary');
const Loan = require('./Loan');
const Admin = require('./Admin')

require('./Associations');

module.exports = { sequelize, User, Book, Exemplary, Loan, Admin };