const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.insertNewProduct);
router.put('/:id', productController.updateProduct);
router.get('/search', productController.findProductByName);

module.exports = router;