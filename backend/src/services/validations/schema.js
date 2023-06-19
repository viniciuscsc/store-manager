const Joi = require('joi');

const produtoSchema = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least 5 characters long',
});

module.exports = {
  produtoSchema,
};
