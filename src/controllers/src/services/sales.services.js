const productModel = require('../models/products.model');
const newSaleData = require('../models/sales.models');
const salesModel = require('../models/sales.models');
// const schema = require('./validations/schema');

const validateSales = async (sales) => {
  const validateProductId01 = sales.every((s) => s.productId !== undefined);
  const validateQuantity01 = sales.every((s) => s.quantity !== undefined);
  const validateQuantity02 = sales.every((s) => s.quantity > 0);

  const result = await productModel.findAll();
  const data = result.map((r) => r.id);
  console.log(data, 'data');
  const validateProductId02 = sales.every((s) => data.includes(s.productId));

  if (validateProductId01 === false) return { type: 1, message: '"productId" is required' };
  if (validateQuantity01 === false) return { type: 2, message: '"quantity" is required' };
  if (validateQuantity02 === false) {
    return { type: 3, message: '"quantity" must be greater than or equal to 1' };
  }
  if (validateProductId02 === false) return { type: 4, message: 'Product not found' };
  const id = await newSaleData.newSalesProduct(sales);// aaaa MSC do zero pedro part 2, min 20 pra frente
  return {
    id,
    itemsSold: sales,
  };
};

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { type: null, message: sales };
};

const salesById = async (id) => {
  const sales = await salesModel.findSalesById(id);
  if (!sales || sales.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sales };
};

const deleteSale = async (saleId) => {
  const checkSaleId = await salesById(saleId);
  if (checkSaleId.type) return { type: checkSaleId.type, message: checkSaleId.message };

  await salesModel.deleteById(saleId);
  return { type: null, message: '' };
};

module.exports = {
  validateSales,
  findAllSales,
  salesById,
  deleteSale,
};
