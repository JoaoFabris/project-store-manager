const productsModel = require('../models/products.model');
// const schema = require('./validations/schema');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const validateNewProduct = async (product) => {
  try {
    const [result] = await productsModel.newProduct(product);
    return { id: result.insertId, name: product };
  } catch (error) {
    return { message: 'Ocorreu um erro ao cadastrar um produto' };
  }
};

const updateProduct = async (product, id) => {
  const [result] = await productsModel.updateProduct(product, id);
  if (result.affectedRows > 0) return { id, name: product.name };
  return { message: 'Product not found' };
};

const deleteProduct = async (productId) => {
  const checkProductId = await findById(productId);
  if (checkProductId.type) return { type: checkProductId.type, message: checkProductId.message };

  await productsModel.deleteProduct(productId);
  return { type: null, message: '' };
};

const findProductByName = async (name) => {
  const product = await productsModel.findProductByName(name);
  if (product.length === 0) {
    return { message: 'Product not found' };
  }
  return product;
};

module.exports = {
  findAll,
  findById,
  validateNewProduct,
  updateProduct,
  findProductByName,
  deleteProduct,
};
