const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique ids

const SECRET_KEY = crypto.randomBytes(64).toString('hex');

const userController = {
    // REGISTER ------------------------------------------------------------
    register: async (req, res) => {
        console.log("Registering user...");
    
        const { username, email, password, phonenum, name, matricno, gender, programmecode, profilePicture } = req.body;
    
        try {
            // Check if the user already exists in the database
            const userExists = await req.sql`SELECT * FROM user_profile WHERE matricno = ${matricno}`;
            if (userExists.length > 0) {
                return res
                  .status(400)
                  .json({
                    message: `User with matric number ${matricno} already exists`,
                    isMatricNoExists: userExists,
                  });
            }
    
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            // Generate a UUID for user_id
            const userId = uuidv4();
    
            // Insert the new user into user_credentials table with a generated UUID
            const response = await req.sql`
                INSERT INTO user_credentials (user_id, username, email, password) 
                VALUES (${userId}, ${username}, ${email}, ${hashedPassword})
                RETURNING user_id`;
    
            // Generate a UUID for profile_id
            const profileId = uuidv4();
    
            // Insert into user_profile with profile picture URL
            const profileResponse = await req.sql`
                INSERT INTO user_profile (profile_id, user_id, phonenum, name, matricno, gender, programmecode, profile_picture)
                VALUES (${profileId}, ${userId}, ${phonenum}, ${name}, ${matricno}, ${gender}, ${programmecode}, ${profilePicture})`;
    
            // Respond with a success message
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },    

    // LOGIN ----------------------------------------------------------------
    login: async (req, res) => {
        const METHOD = "Login Controller"
        console.log(`${METHOD} | start`);
        const { username, password } = req.body;
        console.log(`${METHOD} | username -> ${username} | password -> ${password}`);

        try {
            const user = await req.sql`SELECT * FROM user_credentials WHERE username = ${username}`;

            if (user.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Compare the password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user[0].user_id }, SECRET_KEY, { expiresIn: '1h' });

            console.log(`${METHOD} | Login successful | token -> ${token}`);
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    checkIsUserExist: async (req, res) => {
        const METHOD = "CheckIsUserExist Controller";
        console.log(`${METHOD} | start`);

        const { username, email } = req.body;
        let usernameExists = false;
        let emailExists = false;

        try {
            // Check if the user exists by username or email
            const usernameFound = await req.sql`
                SELECT * FROM user_credentials 
                WHERE username = ${username}`;
            const emailFound = await req.sql`
                SELECT * FROM user_credentials 
                WHERE email = ${email}`;

            if(usernameFound.length > 0){
                usernameExists = true
            }

            if(emailFound.length > 0){
                emailExists = true
            }

            console.log(`${METHOD} | User username -> ${usernameExists}`);
            console.log(`${METHOD} | User email -> ${emailExists}`);
            res.status(200).json({ 
                usernameExists: usernameExists,
                emailExists: emailExists
             });
        } catch (error) {
            console.error('Error during user existence check:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = userController;
