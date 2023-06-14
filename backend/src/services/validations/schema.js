const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const productSchema = Joi.object({
  name: Joi.string().min(5).required()
    .label('name'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least 5 characters long',
});

const saleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().min(1).required()
      .label('productId'),
    quantity: Joi.number().integer().min(1).required()
      .label('quantity'),
  }).messages({
    'any.required': '{{#label}} is required',
    'number.min': '{{#label}} must be greater than zero',
  }),
);

module.exports = {
  idSchema,
  productSchema,
  saleSchema,
};
