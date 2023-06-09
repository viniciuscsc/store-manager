const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const getProductById = async (productId) => {
  const result = await productModel.getProductById(productId);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
};
