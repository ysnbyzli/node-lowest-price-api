const Joi = require("joi");

const createValidation = Joi.object({
  firstName: Joi.string().required().min(3),
  lastName: Joi.string().required().min(3),
  username: Joi.string().required().min(3),
  email: Joi.string().required().email().min(8),
  password: Joi.string().required().min(8),
});

const loginValidation = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
});

const updateValidation = Joi.object({
  email: Joi.string().email().min(8),
  firstName: Joi.string().min(3),
  username: Joi.string().min(3),
  lastName: Joi.string().min(3),
});

const changePassword = Joi.object({
  password: Joi.string().required().min(8),
});

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
  changePassword,
};
