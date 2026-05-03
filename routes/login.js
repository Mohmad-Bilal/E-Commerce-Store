const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByEmAndPass(req.body.email, req.body.password);

    const token = await user.generateToken();
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.post("/profile", auth, async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
