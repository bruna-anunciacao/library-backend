const express = require('express');
const { createLoan, getAllLoans, getLoansByUser } = require('../controllers/LoanController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllLoans);
router.get('/:userId', auth, getLoansByUser);
router.post('/', auth, createLoan);

module.exports = router;