const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const registerValidation = require("../middleware/register-validation");
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.post(
  "/register",
  registerValidation,
  asyncHandler(async (req, res) => {
    const user = new User(req.body);

    const token = await user.generateToken();

    delete req.body.confirmPassword;

    await user.save();

    res.status(200).send(user);

    // res.status(404).send(err.message);
  }),
);

router.get(
  "/users",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.find({});

    res.status(200).send(user);

    // res.status(404).send(err);
  }),
);
router.get(
  "/users/:id",
  auth,
  asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({ _id });

    res.status(200).send(user);

    // res.status(404).send(err);
  }),
);

module.exports = router;
