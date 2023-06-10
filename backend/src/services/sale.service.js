const saleModel = require('../models/sale.model');
const { validateId } = require('./validations/inputValueValidations');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.getSaleById(saleId);
  if (sale) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  getAllSales,
  getSaleById,
};
