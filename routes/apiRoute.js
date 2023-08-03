const express = require("express");
const authHandler = require("../controller/authController");
router = express.Router();

//post auth user
router.route("/").post(authHandler.Register);
router.route("/auth").post(authHandler.Login);

//@desc get all jobs
router.route("/jobs").get(authHandler.jobHandler);

//@desc post a new  job
router.route("/jobs").post(authHandler.jobCreateHandler);

//@desc update a  job
router.route("/job/:id").put(authHandler.jobUpdateHandler);

//@desc get a single job
router.route("/job/:id").get(authHandler.jobOneHandler);

//@describ get current user  profile
router.route("/profile").get(authHandler.profileHandler);

//@describ update current user  profile
router.route("/profile").put(authHandler.profileUpdateHandler);

//@describ get another user's  profile
router.route("/profile/:id").get(authHandler.anotherProfileHandler);

//get jobs
//post jobs
module.exports = router;
