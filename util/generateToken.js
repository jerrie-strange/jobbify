const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});

// const generateToken = (id) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
};

module.exports = generateToken;
