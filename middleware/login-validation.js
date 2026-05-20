const joi = require("joi");
const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(30).required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(500).send("validation error: " + error.details);
  }

  next();
};
module.exports = loginValidation;
