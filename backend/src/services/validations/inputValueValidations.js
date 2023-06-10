const { idSchema, productSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'O Id deve ser um número' };
  return { type: null, message: '' };
};

const validateProduct = (productData) => {
  const { error } = productSchema.validate(productData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
};
