const { connect } = require('../routers/produtoRouter');
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

const atualizarProduto = async (idProduto, dadosProduto) => {
  const { name } = dadosProduto;

  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, idProduto],
  );
};

const deletarProduto = async (idProduto) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [idProduto],
  );
};

module.exports = {
  obterProdutos,
  obterProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
