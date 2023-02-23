const camelize = require('camelize');
const connection = require('./db/connection');

const newSalesProduct = async (productSales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [new Date()],
  );
  productSales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, sale.productId, sale.quantity],
    );
  });
  return insertId;
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS sl
ON sp.sale_id = sl.id`,
  );
  return camelize(result);
};

const findSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sl
    ON sp.sale_id = sl.id
    WHERE sale_id = ${id}`,
  );
  return camelize(result);
};

const deleteById = async (saleId) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [saleId],
  );

  return result;
};

module.exports = {
  newSalesProduct,
  findAllSales,
  findSalesById,
  deleteById,
};
