const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const loginValidation = require("../middleware/login-validation");
const asyncHandler = require("express-async-handler");
const {
  updateEmailValidation,
  updatePasswordValidation,
  updateInfoValidation,
} = require("../middleware/update-profile-validation");

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  asyncHandler(async (req, res) => {
    const user = await User.findByEmAndPass(req.body.email, req.body.password);

    const token = await user.generateToken();
    res.status(200).send({ user, token });

    res.status(500).send({
      message: err.message,
    });
  }),
);

router.get(
  "/profile",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.find({});

    res.status(200).send(user);

    res.status(500).send({
      message: err.message,
    });
  }),
);

router.patch(
  "/profile/updateEmail/:id",
  auth,
  updateEmailValidation,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email: req.body.email },
      { new: true, runValidators: true },
    );

    await user.save();

    res.status(200).send(user);
  }),
);
router.patch(
  "/profile/updatePassword/:id",
  auth,
  updatePasswordValidation,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: req.body.password },
      { new: true, runValidators: true },
    );

    await user.save();

    res.status(200).send(user);
  }),
);
router.patch(
  "/profile/updateInfo/:id",
  auth,
  updateInfoValidation,
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    await user.save();

    res.status(200).send(user);
  }),
);

module.exports = router;
