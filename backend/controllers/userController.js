const userController = {
    signup: async (req, res) => {
        const { username, password } = req.body;
        try {
            // Insert new user into NeonDB
            const response = await req.sql`
            INSERT INTO users (username, password) VALUES (${username}, ${password}) `;
            console.log("Sign-up response:", response);
            res.status(201).json({ message: "Sign up successful" });
        } catch (error) {
            console.error("Error during sign-up:", error);
            res.status(500).json({ message: "Sign up failed", error: error.message });
        }
    }
}

module.exports = userController;