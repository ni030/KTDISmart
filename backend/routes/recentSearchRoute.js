const express = require("express");
const router = express.Router();
const recentSearchController = require("../controllers/recentSearchController")

router.get('/fetch/:user_id', recentSearchController.fetchRecentSearch)

module.exports = router