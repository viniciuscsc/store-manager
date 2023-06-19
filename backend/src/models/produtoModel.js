const connection = require('./connection');

const obterProdutos = async () => {
  const [produtos] = await connection.execute('SELECT * FROM products');

  return produtos;
};

const obterProdutoPorId = async (idProduto) => {
  const [[produto]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [idProduto],
  );

  return produto;
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
