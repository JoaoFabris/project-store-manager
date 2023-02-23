const Joi = require('joi');

// const idSchema = Joi.number().integer().min(1).required();
const idSchema = Joi.object({
  id: Joi.number().required(),
});

const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
idSchema,
addProductSchema,
};