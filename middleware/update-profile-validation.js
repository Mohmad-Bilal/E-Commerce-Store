const joi = require("joi");

const updateEmailValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
const updatePasswordValidation = (req, res, next) => {
  const schema = joi.object({
    password: joi.string().min(8).max(30).required(),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "confirm password must match password",
    }),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

const updateInfoValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    age: joi.number().min(0).max(120),
    country: joi.string().min(3).max(30),
  });
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  updateEmailValidation,
  updatePasswordValidation,
  updateInfoValidation,
};
