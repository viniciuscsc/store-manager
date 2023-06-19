const produtoModel = require('../models/produtoModel');
const { validarProduto } = require('./validations/validacaoValoresEntrada');

const obterProdutos = async () => {
  const produtos = await produtoModel.obterProdutos();

  return { type: null, message: produtos };
};

const obterProdutoPorId = async (idProduto) => {
  const produto = await produtoModel.obterProdutoPorId(idProduto);

  if (!produto) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: produto };
};

const cadastrarProduto = async (dadosProduto) => {
  const produtoErro = validarProduto(dadosProduto);
  if (produtoErro.type) return produtoErro;

  const idNovoProduto = await produtoModel.cadastrarProduto(dadosProduto);
  const { name } = dadosProduto;

  const novoProduto = { id: idNovoProduto, name };

  return { type: null, message: novoProduto };
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
};
