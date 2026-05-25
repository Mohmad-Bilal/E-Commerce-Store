const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

// console.log(process.env.JWT_SECRET);

const auth = async (req, res, next) => {
  try {
    // const secret = process.env.JWT_SECRET || "neroSan55";
    // const token = req.header("Authorization").replace("Bearer", "");
    const token = req.header("Authorization").split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode._id, tokens: token });

    // console.log(user.isAdmin);

    if (!user) {
      throw new Error("plz Authorize");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = auth;
