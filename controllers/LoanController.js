const { Loan, Book, Exemplary } = require("../models/index");
const { changeExemplaryStatus } = require("./ExemplaryController");
const { verifyLoan } = require("./UserController");

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLoansByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const loans = await Loan.findAll({ where: { userId } });
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLoan = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;
    const existingBook = await Book.findOne({ where: { id: bookId } });
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    const avaliableExemplary = await Exemplary.findOne({
      where: { bookId, status: "Disponível" },
    });
    if (!avaliableExemplary) {
      return res
        .status(404)
        .json({ message: "This book don't have any exemplaries" });
    }
    const canLoan = true;
    if (canLoan) {
      const loan = await Loan.create({
        loanDate: new Date(),
        dueDate: new Date(), // temporary
        userId: userId,
        status: 'Emprestado',
        loanStatus: 'Em curso',
        exemplaryId: avaliableExemplary.id,
      });
      await changeExemplaryStatus(avaliableExemplary.id, loan.id);
      return res
        .status(201)
        .json({ message: "Loan created sucessfully", loan });
    } else {
      return res.status(401).json({ message: "This user can't make the loan" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLoan, getAllLoans, getLoansByUser }