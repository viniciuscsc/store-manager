const vendaModel = require('../models/vendaModel');

const {
  validarVenda,
  validarProductIdsVenda,
  validarSaleIdExiste,
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
  deletarVenda,
};
