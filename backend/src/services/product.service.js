const productModel = require('../models/product.model');
const {
  validateId,
  validateProduct,
} = require('./validations/inputValueValidations');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await productModel.getProductById(productId);

  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const registerProduct = async (productData) => {
  const error = validateProduct(productData);
  if (error.type) return error;

  const newProductId = await productModel.registerProduct(productData);
  const newProduct = await productModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, productData) => {
  const productDataError = validateProduct(productData);
  if (productDataError.type) return productDataError;

  const product = await productModel.getProductById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  await productModel.updateProduct(productId, productData);  
  const updatedProduct = await productModel.getProductById(productId);

  return { type: null, message: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
};
