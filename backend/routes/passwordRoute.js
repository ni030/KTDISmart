const express = require('express');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

router.post('/sendOTP', passwordController.sendOTP);
router.post('/verifyOTP', passwordController.verifyOTP);
router.post('/resetPassword', passwordController.resetPassword);
router.post('/checkEmailExistence', passwordController.checkEmailExistence);

module.exports = router;
