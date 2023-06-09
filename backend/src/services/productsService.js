const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const getProductById = async (productId) => {
  const result = await productsModel.getProductById(productId);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
};
