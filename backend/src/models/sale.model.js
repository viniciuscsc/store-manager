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
  return result;
};

const registerSale = async (saleData) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  
  const items = saleData.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [insertId, productId, quantity],
  ));

  await Promise.all(items);

  const newSale = { id: insertId, itemsSold: saleData };

  return newSale;
};

const deleteSale = async (saleId) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [saleId],
  );

  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [saleId],
  );
};

const updateProductQuantity = async (saleId, productId, newQuantity) => {
  const [result] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [newQuantity, saleId, productId],
  );

  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  deleteSale,
  updateProductQuantity,
};
