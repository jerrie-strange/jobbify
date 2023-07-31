const { connect } = require("mongoose");

module.exports = async function connectDatabase(url) {
  try {
    await connect(url);
    console.log("<<<<connected>>>>");
  } catch (error) {
    throw new Error(
      "an error occured when trying to connect to the database",
      error
    );
  }
};
