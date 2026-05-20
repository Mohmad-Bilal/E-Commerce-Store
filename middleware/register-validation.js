const joi = require("joi");

const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "confirm password must match password",
    }),
    age: joi.number().min(0).max(120),
    country: joi.string().min(3).max(30),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(500).send("validation error: " + error.details);
  }

  next();
};
module.exports = registerValidation;
