const produtoService = require('../services/produtoService');

const erros = {
  NAME_IS_REQUIRED: 400,
  NOT_FOUND: 404,
  SMALL_NAME: 422,
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

const cadastrarProduto = async (req, res) => {
  const dadosProduto = req.body;

  const { type, message } = await produtoService.cadastrarProduto(dadosProduto);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
};
