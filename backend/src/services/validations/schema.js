const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  idSchema,
  productSchema,
};
