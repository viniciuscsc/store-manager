const { produtoSchema } = require('./schema');

const validarProduto = (produto) => {
  const { error } = produtoSchema.validate(produto);

  if (error) {
    if (error.message === '"name" is required') {
      return { type: 'NAME_IS_REQUIRED', message: '"name" is required' };
    }

    if (error.message === '"name" length must be at least 5 characters long') {
      return { type: 'SMALL_NAME', message: '"name" length must be at least 5 characters long' };
    }
  }

  return { type: null, message: '' };
};

module.exports = {
  validarProduto,
};
