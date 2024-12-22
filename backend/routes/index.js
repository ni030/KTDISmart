const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const chooseRoomFormRoute = require("./chooseRoomForm");
const complaintFormRoute = require("./complaintForm");
const navigationRoute = require("./navigationRoute");
const eventRoute = require("./eventRoute");
const ktdiMeritRoute = require("./ktdiMeritRoute");
const passwordRoute = require("./passwordRoute");
const amenityRoute = require("./amenityRoute");
const recentSearchRoute = require("./recentSearchRoute");
const otpRoute = require("./otpRoute");

router.use("/password", passwordRoute);
router.use("/user", userRoute);
router.use("/chooseRoom", chooseRoomFormRoute);
router.use("/complaint", complaintFormRoute);
router.use("/navigation", navigationRoute);
router.use("/event", eventRoute);
router.use("/ktdiMerit", ktdiMeritRoute);
router.use("/amenity", amenityRoute);
router.use("/recentSearch", recentSearchRoute);
router.use("/otp", otpRoute);

module.exports = router;
