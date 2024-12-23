const express = require("express");
const passwordController = require("../controllers/passwordController");
const router = express.Router();

router.post("/resetPassword", passwordController.resetPassword);
router.post("/checkEmailExistence", passwordController.checkEmailExistence);

module.exports = router;
