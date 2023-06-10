const productModel = require('../models/product.model');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const result = await productModel.getProductById(productId);
  return result;
};

const registerProduct = async (productData) => {
  const result = await productModel.registerProduct(productData);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
};
