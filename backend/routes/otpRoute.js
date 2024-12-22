const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// Register route
router.post("/reset-password", otpController.resetPassword);

// Login route
router.post("/verify-otp", otpController.verifyOTP);

router.post("/send-otp", otpController.sendOTPEmail);

module.exports = router;
