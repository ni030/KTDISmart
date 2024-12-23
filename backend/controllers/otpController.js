const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(1000, 9999).toString();
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
  verifyOTP: async (req, res) => {
    const { email, otp } = req.body;

    try {
      const result = await req.sql`SELECT * FROM otp_storage
         WHERE email = ${email} AND expires_at > NOW()`;

      console.log("Check result -> " + JSON.stringify(result));

      if (result.length > 0 && result[0].otp === otp) {
        console.log("OTP Correct");
        // OTP is correct - delete it after verification
        await req.sql`DELETE FROM otp_storage WHERE email = ${email}`;
        res.json({ success: true, message: "OTP verified successfully" });
      } else {
        console.log("OTP Incorrect");
        res
          .status(400)
          .json({ success: false, message: "Invalid or expired OTP" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  sendOTPEmail: async (req, res) => {
    console.log("sendOTPEmail start");
    const { email } = req.body;
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

    try {
      await req.sql`INSERT INTO otp_storage (email, otp, expires_at)
      VALUES (${email}, ${otp}, ${expiresAt})
      ON CONFLICT (email)
      DO UPDATE SET otp = ${otp}, expires_at = ${expiresAt}`;

      // Send OTP Email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  },
};

module.exports = otpController;
