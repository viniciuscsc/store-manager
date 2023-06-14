const productService = require('../services/product.service');

const errorMap = {
  VALUE_IS_REQUIRED: 400,
  INVALID_VALUE: 422,
  PRODUCT_NOT_FOUND: 404,
};

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAllProducts();

  if (type) return res.status(errorMap[type]).json(message);
  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.getProductById(+id);

  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const productData = req.body;

  const { type, message } = await productService.registerProduct(productData);

  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  const { type, message } = await productService.updateProduct(+id, productData);

  if (type) return res.status(errorMap[type]).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await productService.deleteProduct(+id);

  return res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
