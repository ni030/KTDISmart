const express = require("express");
const passwordController = require("../controllers/passwordController");
// const otpController = require('../controllers/otpController')
const router = express.Router();

// router.post("/sendOTP", otpController.sendOtpEmail);
// router.post('/verifyOTP', passwordController.verifyOTP);
// router.post('/resetPassword', passwordController.resetPassword);
router.post("/checkEmailExistence", passwordController.checkEmailExistence);

module.exports = router;
