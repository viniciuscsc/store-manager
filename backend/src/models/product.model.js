const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getProductById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

const registerProduct = async (productData) => {
  const { name } = productData;
  const result = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
};
