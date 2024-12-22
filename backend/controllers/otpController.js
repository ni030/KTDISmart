const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// In-memory OTP storage (replace with Redis or DB in production)
let otpStore = {};

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const otpController = {
  resetPassword: async (req, res) => {
    const { email, newPassword } = req.body;

    console.log(`Password reset for ${email}: ${newPassword}`);
    res.json({ success: true, message: "Password reset successful" });
  },
  verifyOTP: (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (record && record.otp === otp && record.expires > Date.now()) {
      delete otpStore[email]; // OTP can only be used once
      res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }
  },
  sendOTPEmail: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const otp = generateOTP();
    otpStore[email] = { otp, expires: Date.now() + 300000 }; // OTP expires in 5 min

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  },
};

module.exports = otpController;
