const saleService = require('../services/sale.service');

const getAllSales = async (_req, res) => {
  const result = await saleService.getAllSales();
  return res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(+id);
  return res.status(200).json(result);
};

module.exports = {
  getAllSales,
  getProductById,
};
