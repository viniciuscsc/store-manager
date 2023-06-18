const produtoService = require('../services/produtoService');

const erros = {
  NOT_FOUND: 404,
};

const obterProdutos = async (_req, res) => {
  const { message } = await produtoService.obterProdutos();
  
  return res.status(200).json(message);
};

const obterProdutoPorId = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await produtoService.obterProdutoPorId(+id);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
