const { EmptyResultError } = require("sequelize");
const { Exemplary, Book } = require("../models/index");

const getExemplaries = async (req, res) => {
  try {
    const { bookId } = req.params;
    const exemplaries = await Exemplary.findAll({ where: { bookId } });
    res.status(200).json(exemplaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createExemplary = async (req, res) => {
  try {
    const { bookId } = req.params;
    const id = bookId
    const existingBook = await Book.findOne({ where: { id } });
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    await Exemplary.create({
      status: "Disponível",
      bookId,
    });

    res.status(201).json({
      message: "Exemplary created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeExemplaryStatus = async (id, loanId, res) => {
  try {
      const exemplary = await Exemplary.findByPk(id);
      exemplary.status = 'Emprestado';
      exemplary.loanId = loanId;
      await exemplary.save();
      return;
  } catch (err) {
      return;
  }
}

module.exports = { getExemplaries, createExemplary, changeExemplaryStatus };