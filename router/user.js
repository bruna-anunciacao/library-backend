const express = require('express');
const { getUsers, createUser, loginUser, changeUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', createUser);
router.post('/signin', loginUser);
router.put('/change/:id', changeUser);
router.delete('/delete/:id', deleteUser)

module.exports = router;