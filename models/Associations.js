const User = require('./User');
const Book = require('./Book');
const Exemplary = require('./Exemplary');
const Loan = require('./Loan');

User.hasMany(Loan, { foreignKey: 'userId', as: 'loans'});
Loan.belongsTo(User, { foreignKey: 'userId', as: 'user'});

Exemplary.hasMany(Loan, { foreignKey: 'exemplaryId', as: 'loans'});
Loan.belongsTo(Exemplary, { foreignKey: 'exemplaryId', as: 'exemplary'});

Book.hasMany(Exemplary, { foreignKey: 'bookId', as: 'exemplary'});
Exemplary.belongsTo(Book, { foreignKey: 'bookId', as: 'book'});