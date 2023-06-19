const connection = require('./connection');

const obterVendas = async () => {
  const [vendas] = await connection.execute(
    `SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
      ON s.id = sp.sale_id
    ORDER BY saleId, productId`,
  );

  return vendas;
};

const obterVendaPorId = async (idVenda) => {
  const [venda] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
      ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sale_id, productId`,
    [idVenda],
  );

  return venda; 
};

module.exports = {
  obterVendas,
  obterVendaPorId,
};
