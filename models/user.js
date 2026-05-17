const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// require("dotenv");
// require("dotenv").config();
// const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    require: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol",
        );
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    trim: true,
    default: "Unknown",
  },
  tokens: [
    {
      type: String,
      require: true,
    },
  ],
});

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
});

userSchema.statics.findByEmAndPass = async function (em, pass) {
  const user = await User.findOne({ email: em });

  if (!user) {
    throw new Error("there is something wrong with the email");
  }
  const isMatch = bcryptjs.compare(pass, user.password);

  if (!isMatch) {
    throw new Error("there is something worn with the password");
  }
  return user;
};

userSchema.methods.generateToken = async function () {
  const secret = process.env.JWT_SECRET || "neroSan55";
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
