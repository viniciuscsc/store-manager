const { idSchema, productSchema, saleSchema } = require('./schema');
const productModel = require('../../models/product.model');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'O Id deve ser um número' };
  return { type: null, message: '' };
};

const validateProduct = (productData) => {
  const { error } = productSchema.validate(productData);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  } 
  return { type: null, message: '' };
};

const validateProductIdSale = (saleData) => {
  const { error } = saleSchema.validate(saleData);
    if (error && error.message === '"productId" is required') {
      return { type: 'VALUE_IS_REQUIRED', message: '"productId" is required' };
    }
  return { type: null, message: '' };
};

const validateQuatitySale = (saleData) => {
  const { error } = saleSchema.validate(saleData);
  if (error) {
    if (error.message === '"quantity" is required') {
      return { type: 'VALUE_IS_REQUIRED', message: '"quantity" is required' };
    }
    if (error.message === '"quantity" must be greater than zero') {
      return { type: 'LESS_THAN_ONE', message: '"quantity" must be greater than or equal to 1' };
    }
  }
  return { type: null, message: '' };
};

const validateProductIdExists = async (saleData) => {
  const productsDatabase = await productModel.getAllProducts();
  const idsDatabase = productsDatabase
    .map(({ id }) => id);
    
    const idsSale = saleData
    .map(({ productId }) => productId);
    
    const AllIdsExists = idsSale
    .every((idSale) => idsDatabase.includes(idSale));
    
  if (!AllIdsExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
  validateProductIdSale,
  validateQuatitySale,
  validateProductIdExists,
};
