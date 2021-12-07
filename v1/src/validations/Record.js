const Joi = require("joi");

const createValidation = Joi.object({
  price: Joi.number().required().positive(),
  product: Joi.string().required(),
});

module.exports = {
  createValidation,
};
