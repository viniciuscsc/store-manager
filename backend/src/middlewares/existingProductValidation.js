const { getProductById } = require('../models/product.model');

const existingProductValidation = async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(+id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = existingProductValidation;
