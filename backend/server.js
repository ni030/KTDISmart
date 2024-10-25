const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { neon } = require("@neondatabase/serverless");
const routes = require("./routes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const sql = neon(process.env.DATABASE_URL);

// Middleware to attach sql instance to req
app.use((req, res, next) => {
  req.sql = sql;
  next();
});

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use('/db', routes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
