const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    const token = await user.generateToken();

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});
router.get("/users/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({ _id });

    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
