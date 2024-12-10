//const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const passwordController = {

    //Check if Email Exists
    checkEmailExistence: async (req, res) => {
        const data = req.body.data.email;
        try {
            const user = await req.sql`SELECT * FROM user_credentials WHERE email = ${data}`;
            if (user.length > 0) {
                return res.status(200).json({ exists: true, message: 'Email exists!' });
            } else {
                return res.status(204).json({ exists: false, message: 'Email not found!' });
            }
        } catch (error) {
            console.error('Error during checking email..', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },


    // (a) Send OTP to User's Email
    sendOTP: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await req.sql`
                SELECT * FROM user_credentials WHERE email = ${email}
            `;
            if (user.length === 0) {
                return res.status(400).json({ message: 'Email not found!' });
            }

            const otp = generateOTP();
            await req.sql`
                INSERT INTO password_reset_requests (email, otp) VALUES (${email}, ${otp})
            `;

            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: { user: 'your-email@gmail.com', pass: 'your-password' },
            // });

            // await transporter.sendMail({
            //     from: 'your-email@gmail.com',
            //     to: email,
            //     subject: 'Password Reset OTP',
            //     text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
            // });

            res.status(200).json({ message: 'OTP sent successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // (b) Verify OTP
    verifyOTP: async (req, res) => {
        const { email, otp } = req.body;

        try {
            const result = await req.sql`
                SELECT * FROM password_reset_requests
                WHERE email = ${email} AND otp = ${otp} AND is_used = FALSE
            `;
            if (result.length === 0) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }

            await req.sql`
                UPDATE password_reset_requests
                SET is_used = TRUE WHERE email = ${email} AND otp = ${otp}
            `;

            res.status(200).json({ message: 'OTP verified successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // (c) Reset Password
    resetPassword: async (req, res) => {
        const { email, newPassword } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await req.sql`
                UPDATE user_credentials
                SET password = ${hashedPassword} WHERE email = ${email}
            `;

            res.status(200).json({ message: 'Password reset successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = passwordController;
