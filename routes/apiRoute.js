const express = require("express");
const authHandler = require("../controller/authController");
router = express.Router();

//post auth user
router.route("/").post(authHandler.Register);
router.route("/auth").post(authHandler.Login);

//get jobs
//post jobs
module.exports = router;
