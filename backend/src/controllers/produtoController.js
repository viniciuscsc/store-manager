const produtoService = require('../services/produtoService');

const obterProdutos = async (_req, res) => {
  const produtos = await produtoService.obterProdutos();
  
  return res.status(200).json(produtos);
};

module.exports = {
  obterProdutos,
};
