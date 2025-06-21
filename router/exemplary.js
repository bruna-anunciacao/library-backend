const express = require('express');
const { getExemplaries, createExemplary } = require('../controllers/ExemplaryController');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/:bookId', getExemplaries);
router.post('/:bookId', admin, createExemplary);

module.exports = router;