const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    username: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profile: {
      type: String,
      required: true,
      default: "userPic",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = model("User", UserSchema);

module.exports = User;
