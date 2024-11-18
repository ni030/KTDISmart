const express = require("express");
const router = express.Router();
const navigationController = require("../controllers/navigationController")

router.post('/create/location', navigationController.saveCurrentLocation)
router.post('/create/search', navigationController.saveSearchLocation)
router.get('/check/:matricNum',navigationController.fetchSearchLocation)

module.exports = router