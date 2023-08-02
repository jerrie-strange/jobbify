const { model, Schema } = require("mongoose");

const JobSchema = new Schema(
  {
    companyName: {
      required: true,
      type: String,
    },
    describtion: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model("Job", JobSchema);

module.exports = Job;
