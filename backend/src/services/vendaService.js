const vendaModel = require('../models/vendaModel');

const obterVendas = async () => {
  const vendas = await vendaModel.obterVendas();

  return { type: null, message: vendas };
};

module.exports = {
  obterVendas,
};
