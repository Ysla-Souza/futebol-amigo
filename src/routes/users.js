const express = require('express');
const UserController = require('../controller/users'); // Importar a classe UserController

const router = express.Router();
const userController = new UserController(); // Instanciar a classe UserController

// router.post('/login', userController.loginUser.bind(userControler));
router.post('/register', userController.registerUser.bind(userController));
router.post('/find', userController.findByEmail.bind(userController));
router.put('/', userController.updateUser.bind(userController));
router.delete('/', userController.deleteUser.bind(userController));

module.exports = router;
