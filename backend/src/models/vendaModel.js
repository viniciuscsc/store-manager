const connection = require('./connection');

const obterVendas = async () => {
  const [vendas] = await connection.execute(
    `SELECT
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
      WHERE sp.sale_id = s.id`,
  );

  return vendas;
};

module.exports = {
  obterVendas,
};
