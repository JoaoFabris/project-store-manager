const express = require('express');

const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', salesController.insertNewSales);
router.get('/', salesController.listAllSales);
router.get('/:id', salesController.getSalesById);
router.delete('/:id', salesController.deleteSale);

module.exports = router;