const connection = require('./connection');

const obterProdutos = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

const obterProdutoPorId = async (idProduto) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [idProduto],
  );

  return result;
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
