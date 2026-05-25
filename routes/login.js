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

    // res.status(500).send({
    //   message: err.message,
    // });
  }),
);

router.get(
  "/profile",
  auth,
  asyncHandler(async (req, res) => {
    res.status(200).send(req.user);
    console.log(req.user.isAdmin);
    // res.status(500).send({
    //   message: err.message,
    // });
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

router.delete(
  "/profile/:id",
  auth,
  asyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).send({
          message: "there is no user with this id",
        });
      }

      res.status(200).send(user);
    } else {
      res.status(403).send({
        message: "you are not authorized to delete this user",
      });
    }
  }),
);

module.exports = router;
