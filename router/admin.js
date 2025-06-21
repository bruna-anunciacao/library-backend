const express = require('express');
const { getAdmins, createAdmin, loginAdmin } = require("../controllers/AdminController");

const router = express.Router();

router.get('/', getAdmins);
router.post('/', createAdmin);
router.post('/login', loginAdmin);

module.exports = router;