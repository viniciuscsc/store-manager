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

const cadastrarProduto = async (dadosProduto) => {
  const { name } = dadosProduto;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
};
