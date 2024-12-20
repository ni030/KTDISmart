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
    }
}

module.exports = passwordController;
