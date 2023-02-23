const productService = require('../services/product.services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  console.log(type);
  if (type === 404) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const insertNewProduct = async (req, res) => {
  const { body: { name } } = req;
  if (!name) {
    res.status(400).json({ message: '"name" is required' });
  } else if (name.length < 5) {
    res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  } else if (name) {
    const result = await productService.validateNewProduct(name);
    res.status(201).json(result);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const validate = await productService.findById(id);
  const { type } = validate;
  if (type) return res.status(404).json(validate);
  if (!product.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (product.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (product.name.length >= 5) {
    const result = await productService.updateProduct(product, id);
    return res.status(200).json(result);
  }
};

const findProductByName = async (req, res, next) => {
  try {
    const { q } = req.query;
    const product = await productService.findProductByName(q);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  listProducts,
  getProductById,
  insertNewProduct,
  updateProduct,
  findProductByName,
};
