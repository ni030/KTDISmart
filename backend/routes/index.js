const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const chooseRoomFormRoute = require("./chooseRoomForm");
const complaintRoute = require("./complaintForm");

router.use("/user", userRoute);
router.use("/chooseRoom", chooseRoomFormRoute);
router.use("/complaint", complaintRoute);

module.exports = router;