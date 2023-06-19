const vendaModel = require('../models/vendaModel');

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
  const idNovaVenda = await vendaModel.cadastrarVenda(dadosVenda);

  const novaVenda = { id: idNovaVenda, itemsSold: dadosVenda };

  return { type: null, message: novaVenda };
};

module.exports = {
  obterVendas,
  obterVendaPorId,
  cadastrarVenda,
};
