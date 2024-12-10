const express = require("express");
const router = express.Router();
const amenityController = require("../controllers/amenityController")

router.get('/fetch/water_dispenser', amenityController.getWaterDispenser)
router.get('/fetch/rubbish_bin', amenityController.getRubbishBin)
router.get('/fetch/shop', amenityController.getShop)

module.exports = router