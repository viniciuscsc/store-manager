const saleModel = require('../models/sale.model');

const {
  validateId,
  validateProductIdSale,
  validateQuatitySale,
  validateProductIdExists,
} = require('./validations/inputValueValidations');

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const error = validateId(saleId);
  if (error.type) return error;

  const sale = await saleModel.getSaleById(saleId);
  if (!sale || sale.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const registerSale = async (saleData) => {
  const productIdError = validateProductIdSale(saleData);
  if (productIdError.type) return productIdError;

  const quantityError = validateQuatitySale(saleData);
  if (quantityError.type) return quantityError;

  const AllIdsExists = await validateProductIdExists(saleData);
  if (AllIdsExists.type) return AllIdsExists;

  const newSaleId = await saleModel.registerSale(saleData);
  return { type: null, message: newSaleId };
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
};
