const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result;
};

const getSaleById = async (saleId) => {
  const result = await salesModel.getSaleById(saleId);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
};
