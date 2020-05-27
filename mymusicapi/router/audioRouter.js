const express = require("express");
const audioController = require("../controller/audioController");
const authenticationController = require("../controller/authenticationController");
const router = express.Router();

router
  .route("/")
  .get(authenticationController.sendProtect, audioController.getAllAudios); //authenticationController.sendProtect,
router
  .route("/:id")
  .get(authenticationController.sendProtect, audioController.getAudio);
router.route("/image/:id").get(audioController.getAudioImage);
router
  .route("/search/:id")
  .get(authenticationController.sendProtect, audioController.getSearchedSong);

module.exports = router;
