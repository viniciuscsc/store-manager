const vendaService = require('../services/vendaService');

const erros = {
  NOT_FOUND: 404,
};

const obterVendas = async (_req, res) => {
  const { message } = await vendaService.obterVendas();

  return res.status(200).json(message);
};

const obterVendaPorId = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await vendaService.obterVendaPorId(+id);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  obterVendas,
  obterVendaPorId,
};
