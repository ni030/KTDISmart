const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'codekx822@gmail.com',
        pass: 'Testcode123',
    },
});

const otpController = {
    sendOtpEmail: async (req, res) => {
        console.log("sending email at backend")
        const { userEmail } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

        const mailOptions = {
            from: 'codekx822@gmail.com',
            to: email,
            subject: 'KTDI Smart Reset Password OTP',
            text: `Your OTP for resetting the password is ${otp}. It will expire in 2 minutes.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'OTP sent successfully', otp }); // Include OTP for testing
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ success: false, message: 'Failed to send OTP' });
        }
    }
}

module.exports = otpController