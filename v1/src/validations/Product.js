const Joi = require("joi");

const updateValidation = Joi.object({
  title: Joi.string().min(3),
  barcod: Joi.string().min(8),
  price: Joi.number().positive(),
});

module.exports = {
  updateValidation,
};
