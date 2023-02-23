// const snakeize = require('snakeize');
const connection = require('./db/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const newProduct = (product) => connection.execute(`
  INSERT INTO StoreManager.products (name) VALUES (?)
`, [product]);

const updateProduct = (product, id) => connection.execute(
  `UPDATE StoreManager.products
    SET name = ? WHERE id = ?`, [product.name, id],
); 

const deleteProduct = async (productId) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return result;
};

const findProductByName = async (name) => {
  const nameQuery = `%${name}%`;
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name LIKE ?;', [nameQuery]);
  return result;
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
  deleteProduct,
  findProductByName,
};