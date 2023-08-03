const express = require("express");
const connectDatabase = require("./database/dbconfig.js");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5500;
const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/jobbify";
const app = express();
connectDatabase(url);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/apiRoute.js"));

app.listen(PORT, () =>
  console.log(`server start on port <<http://localhost:${PORT}>>`)
);
