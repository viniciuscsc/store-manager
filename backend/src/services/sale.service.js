const saleModel = require('../models/sale.model');

const getAllSales = async () => {
  const result = await saleModel.getAllSales();
  return result;
};

const getSaleById = async (saleId) => {
  const result = await saleModel.getSaleById(saleId);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
};
