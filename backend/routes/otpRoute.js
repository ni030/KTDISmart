const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");


router.post("/reset-password", otpController.resetPassword);

router.post("/verify-otp", otpController.verifyOTP);

router.post("/send-otp", otpController.sendOTPEmail);

module.exports = router;
