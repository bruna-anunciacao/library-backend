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
      year,
    });

    res.status(201).json({
      message: "Book created successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const changeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, publisher, author, edition, year } = req.body;

    const oldBook = await Book.findByPk(id);
    if (!oldBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (code) oldBook.code = code;
    if (title) oldBook.title = title;
    if (publisher) oldBook.publisher = publisher;
    if (author) oldBook.author = author;
    if (edition) oldBook.edition = edition;
    if (year) oldBook.year = year;

    await oldBook.save();

    res
      .status(200)
      .json({ message: "Book updated successfully", book: oldBook });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByPk(id);
    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    await deletedBook.destroy();
    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getBooks, createBook, changeBook, deleteBook };
