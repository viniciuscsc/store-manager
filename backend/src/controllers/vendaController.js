const vendaService = require('../services/vendaService');

const obterVendas = async (_req, res) => {
  const { type, message } = await vendaService.obterVendas();

  // if (type) return res.status().json();

  return res.status(200).json(message);
};

module.exports = {
  obterVendas,
};
