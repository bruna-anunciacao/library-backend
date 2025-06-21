const express = require('express');
const { getBooks, createBook } = require('../controllers/BookController');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/', getBooks);
router.post('/', admin, createBook);

module.exports = router;