const connection = require('./connection');

const obterProdutos = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

module.exports = {
  obterProdutos,
};
