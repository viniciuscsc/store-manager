const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
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
  return result;
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
      ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sale_id, productId`,
    [saleId],
  );
  console.log(result);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
};
