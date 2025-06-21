const express = require('express');
const { getBooks, createBook, changeBook, deleteBook } = require('../controllers/BookController');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', getBooks);
router.post('/', admin, createBook);
router.put('/:id', admin, changeBook);
router.delete('/:id', admin, deleteBook);

module.exports = router;