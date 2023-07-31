const User = require("../database/model");
const generateToken = require("../util/generateToken");

module.exports = {
  Register: async (req, res) => {
    const { email, username, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      res.json({ message: "user already Exists" });
      //   throw new Error("User already Exists");
    } else {
      try {
        const user = await User.create({
          email,
          username,
          password,
        });
        if (user) {
          res.status(201).json({
            _id: user._id,
            email: user.email,
            username: user.username,
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

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        profile: user.profile,
        token: generateToken(user.id),
      });
    } else {
      res
        .status(404)
        .json({ message: "User Not found   !invaild email or password" });
    }
  },
};
