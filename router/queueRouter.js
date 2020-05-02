const express = require("express");
const queueController = require("../controller/queueController");
const authController = require("../controller/authenticationController");
const router = express.Router();

router
  .route("/")
  .post(authController.sendProtect, queueController.createQueue)
  .get(authController.sendProtect, queueController.getQueues)
  .delete(authController.sendProtect, queueController.deleteQueue);
// router
//   .route("/:id")
//   .get(queueController.getQueues)
//   .delete(queueController.deleteQueue);

module.exports = router;
