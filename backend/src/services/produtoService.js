const produtoModel = require('../models/produtoModel');
const {
  validarProduto,
  validarProductIdExiste,
} = require('./validations/validacaoValoresEntrada');

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

  const novoProduto = { id: idNovoProduto, name: dadosProduto.name };

  return { type: null, message: novoProduto };
};

const atualizarProduto = async (idProduto, dadosProduto) => {
  const idProdutoErro = await validarProductIdExiste(idProduto);
  if (idProdutoErro.type) return idProdutoErro;

  const produtoErro = validarProduto(dadosProduto);
  if (produtoErro.type) return produtoErro;

  await produtoModel.atualizarProduto(idProduto, dadosProduto);

  const produtoAtualizado = { id: idProduto, name: dadosProduto.name };

  return { type: null, message: produtoAtualizado };
};

const deletarProduto = async (idProduto) => {
  const idProdutoErro = await validarProductIdExiste(idProduto);
  if (idProdutoErro.type) return idProdutoErro;

  await produtoModel.deletarProduto(idProduto);

  return { type: null, message: '' };
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
