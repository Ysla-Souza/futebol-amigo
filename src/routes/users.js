const express = require('express');
const UserController = require('../controller/users'); // Importar a classe UserController

const router = express.Router();
const userController = new UserController(); // Instanciar a classe UserController

router.post('/invitation', userController.updateInvitation.bind(userController));
router.post('/login', userController.loginUser.bind(userController));
router.post('/register', userController.registerUser.bind(userController));
router.post('/find', userController.findByEmail.bind(userController));
router.put('/', userController.updateUser.bind(userController));
router.delete('/', userController.deleteUser.bind(userController));

module.exports = router;
