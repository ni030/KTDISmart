
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// checkIsUserExist route
router.post('/checkIsUserExist', userController.checkIsUserExist);

router.post('/getUserById', userController.getUserById);

module.exports = router;