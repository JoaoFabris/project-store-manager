const salesServices = require('../services/sales.services');
const errorMap = require('../utils/errorMap');

  const insertNewSales = async (req, res) => {
    const validate = await salesServices.validateSales(req.body);
    if (validate.type === 1) return res.status(400).json({ message: validate.message });
    if (validate.type === 2) return res.status(400).json({ message: validate.message });
    if (validate.type === 3) return res.status(422).json({ message: validate.message });
    if (validate.type === 4) return res.status(404).json({ message: validate.message });
    console.log(validate);
    return res.status(201).json(validate);
  };

const listAllSales = async (req, res) => {
  const { type, message } = await salesServices.findAllSales();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.salesById(id);
  if (type === 404) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.deleteSale(id);

  if (type) return res.status(type).json({ message });

  res.status(204).json();
};

module.exports = {
  insertNewSales,
  listAllSales,
  getSalesById,
  deleteSale,
};