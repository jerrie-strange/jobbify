const User = require("../database/model");
const Job = require("../database/jobModel");
const generateToken = require("../util/generateToken");

module.exports = {
  Register: async (req, res) => {
    const { email, companyName, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      res.json({ message: "user already Exists" });
      //   throw new Error("User already Exists");
    } else {
      try {
        const user = await User.create({
          email,
          companyName,
          password,
        });
        if (user) {
          // generateToken(res, user.id);
          res.status(201).json({
            _id: user._id,
            email: user.email,
            companyName: user.companyName,
            isAdmin: user.isAdmin,
            profile: user.profile,
            token: generateToken(user.id),
          });
        }
      } catch (error) {
        res.status(500).json({ message: "an Error Occured" });
        // throw new Error("an Error Occured");
      }
    }
  },

  Login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(req.cookies.jwt);
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user.id);
      res.status(200).json({
        _id: user._id,
        email: user.email,
        companyName: user.companyName,
        isAdmin: user.isAdmin,
        profile: user.profile,
        // token: generateToken(user.id),
      });
    } else {
      res
        .status(404)
        .json({ message: "User Not found   !invaild email or password" });
    }
  },
  // @ this function has not be tested!!!!!
  jobUpdateHandler: async (req, res) => {
    const jobId = req.params["id"];
    const { companyName, describtion, title } = req.body;
    const job = Job.findOne({ _id: jobId });
    if (job) {
      //@error you will need to get the current user companyName then pass it to  { user.companyName}
      if (job.companyName == user.companyName) {
        Job.findOneAndUpdate(
          { companyName: job.companyName },
          {
            companyName,
            describtion,
            title,
          }
        );
      } else {
        throw new Error("you cant change a job that you did not post");
      }
    } else {
      throw new Error("job not found");
    }
  },
  // @ this function has be tested!!!!!
  jobCreateHandler: async (req, res) => {
    const { companyName, describtion, title } = req.body;
    try {
      const job = await new Job({
        companyName,
        describtion,
        title,
      });
      job.save();
      res.status(201).json({
        id: job._id,
        companyName: job.companyName,
        describtion: job.describtion,
        title: job.title,
      });
    } catch (error) {
      res.status(500).json({ message: "could not create the Job" });
      // throw new Error("could not create the Job");
    }
  },
  // @ this function has  be tested!!!!!
  //@desc get all jobs
  jobHandler: async (req, res) => {
    try {
      const jobs = await Job.find({});
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(404).json({ message: "no results found" });
    }
  },
  // @ this function has not be tested!!!!!
  jobOneHandler: async (req, res) => {
    const jobId = req.params(id);
    try {
      const job = Job.findOne({ _id: jobId });
      res.status(200).json({ job });
    } catch (error) {
      res.status(404).json({ message: "no results found" });
    }
  },
  // @ this function has not be tested!!!!!
  profileHandler: async (req, res) => {
    //@error you will need to get the current user email then pass it to  { req.email}
    const email = req.email;
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        companyName: user.companyName,
        isAdmin: user.isAdmin,
        profile: user.profile,
      });
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  },
  // @ this function has not be tested!!!!!
  anotherProfileHandler: () => {
    const userId = req.params(id);
    try {
      const user = User.findOne({ _id: userId });
      res.status(200).json({
        _id: user._id,
        email: user.email,
        companyName: user.companyName,
        profile: user.profile,
      });
    } catch (error) {
      res.status(404).json({ message: "no results found" });
    }
  },

  profileUpdateHandler: async () => {
    const { email, companyName, profile } = req.body;

    try {
      const profileUpdate = User.findOneAndUpdate(
        { email },
        {
          email,
          companyName,
          profile,
        }
      );
      res.status(200).json({
        id: profileUpdate._id,
        email: profileUpdate.email,
        companyName: profileUpdate.companyName,
        profile: profileUpdate.profile,
      });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },
};
