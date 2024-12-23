
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

router.post('/checkIsUserExist', userController.checkIsUserExist);

router.post('/getUserById', userController.getUserById);

router.post('/updateUser/:userId', userController.updateUser);


module.exports = router;