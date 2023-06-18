const produtoModel = require('../models/produtoModel');

const obterProdutos = async () => {
  const produtos = await produtoModel.obterProdutos();

  return produtos;
};

module.exports = {
  obterProdutos,
};
