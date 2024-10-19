const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { neon } = require("@neondatabase/serverless");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const sql = neon(process.env.DATABASE_URL);

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Sign-up endpoint
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Insert new user into NeonDB
    const response = await sql`
      INSERT INTO users (username, password) VALUES (${username}, ${password})
    `;
    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Sign up failed", error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
