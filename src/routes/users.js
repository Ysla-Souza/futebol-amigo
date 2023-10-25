const express = require('express');
const { findByEmail, registerUser, updateUser, deleteUser } = require('../controller/users');

const router = express.Router();

router.get('/', findByEmail);
router.post('/register', registerUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;