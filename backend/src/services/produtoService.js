const produtoModel = require('../models/produtoModel');

const obterProdutos = async () => {
  const produtos = await produtoModel.obterProdutos();

  return produtos;
};

const obterProdutoPorId = async (idProduto) => {
  const produto = await produtoModel.obterProdutoPorId(idProduto);

  return produto;
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
