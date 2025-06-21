const { Book } = require("../models/index");

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { code, title, publisher, author, edition, year } = req.body;
    const existingBook = await Book.findOne({ where: { code } });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    await Book.create({
        code,
        title,
        publisher,
        author,
        edition,
        year
    })

    res.status(201).json({
        message: 'Book created successfully'
    })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getBooks, createBook };
