const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const chooseRoomFormRoute = require("./chooseRoomForm");

router.use("/user", userRoute);
router.use("/chooseRoom", chooseRoomFormRoute);

module.exports = router; 