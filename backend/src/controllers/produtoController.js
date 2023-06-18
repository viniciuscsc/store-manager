const produtoService = require('../services/produtoService');

const obterProdutos = async (_req, res) => {
  const produtos = await produtoService.obterProdutos();
  
  return res.status(200).json(produtos);
};

const obterProdutoPorId = async (req, res) => {
  const { id } = req.params;

  const produto = await produtoService.obterProdutoPorId(+id);

  return res.status(200).json(produto);
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
