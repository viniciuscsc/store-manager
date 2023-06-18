const produtoModel = require('../models/produtoModel');

const obterProdutos = async () => {
  const produtos = await produtoModel.obterProdutos();

  return { type: null, message: produtos };
};

const obterProdutoPorId = async (idProduto) => {
  const produto = await produtoModel.obterProdutoPorId(idProduto);

  if (!produto) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: produto };
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
