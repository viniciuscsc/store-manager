const vendaService = require('../services/vendaService');

const erros = {
  VALUE_IS_REQUIRED: 400,
  NOT_FOUND: 404,
  SMALL_VALUE: 422,
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

const cadastrarVenda = async (req, res) => {
  const dadosVenda = req.body;

  const { type, message } = await vendaService.cadastrarVenda(dadosVenda);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(201).json(message);
};

const atualizarVenda = async (req, res) => {
  const { saleId, productId } = req.params;
  const dadosAlterar = req.body;

  const { type, message } = await vendaService.atualizarVenda(+saleId, +productId, dadosAlterar);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(200).json(message);
};

const deletarVenda = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await vendaService.deletarVenda(+id);

  if (type) return res.status(erros[type]).json({ message });

  return res.status(204).end();
};

module.exports = {
  obterVendas,
  obterVendaPorId,
  cadastrarVenda,
  deletarVenda,
  atualizarVenda,
};
