const vendaModel = require('../models/vendaModel');

const {
  validarVenda,
  validarQuantidade,
  validarProductIdsVenda,
  validarSaleIdExiste,
  validarProductIdExiste,
} = require('./validations/validacaoValoresEntrada');

const obterVendas = async () => {
  const vendas = await vendaModel.obterVendas();

  return { type: null, message: vendas };
};

const obterVendaPorId = async (idVenda) => {
  const venda = await vendaModel.obterVendaPorId(idVenda);

  if (!venda || venda.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: venda };
};

const cadastrarVenda = async (dadosVenda) => {
  const vendaErro = validarVenda(dadosVenda);
  if (vendaErro.type) return vendaErro;

  const vendaProductIdsErro = await validarProductIdsVenda(dadosVenda);
  if (vendaProductIdsErro.type) return vendaProductIdsErro;

  const idNovaVenda = await vendaModel.cadastrarVenda(dadosVenda);

  const novaVenda = { id: idNovaVenda, itemsSold: dadosVenda };

  return { type: null, message: novaVenda };
};

const atualizarVenda = async (idVenda, idProduto, dadosAlterar) => {
  const idVendaErro = await validarSaleIdExiste(idVenda);
  if (idVendaErro.type) return idVendaErro;

  const idProdutoErro = await validarProductIdExiste(idProduto);
  if (idProdutoErro.type) return { type: 'NOT_FOUND', message: 'Product not found in sale' };

  const quantidadeErro = validarQuantidade(dadosAlterar);
  if (quantidadeErro.type) return quantidadeErro;

  const dataVenda = await vendaModel.atualizarVenda(idVenda, idProduto, dadosAlterar);

  const itemVendidoAtualizado = {
    date: dataVenda,
    productId: idProduto,
    quantity: dadosAlterar.quantity,
    saleId: idVenda,
  };

  return { type: null, message: itemVendidoAtualizado };
};

const deletarVenda = async (idVenda) => {
  const idVendaErro = await validarSaleIdExiste(idVenda);
  if (idVendaErro.type) return idVendaErro;

  await vendaModel.deletarVenda(idVenda);

  return { type: null, message: '' };
};

module.exports = {
  obterVendas,
  obterVendaPorId,
  cadastrarVenda,
  atualizarVenda,
  deletarVenda,
};
