const express = require("express");
const authenticationController = require("../controller/authenticationController");
const router = express.Router();

router.route("/login").post(authenticationController.signin);
router.route("/logout").post(authenticationController.logout);
router.route("/getLoginDetails").get(authenticationController.signinDetails);

module.exports = router;
