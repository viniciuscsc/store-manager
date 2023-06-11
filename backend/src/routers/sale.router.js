const { Router } = require('express');

const saleController = require('../controllers/sale.controller');

const router = Router();

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.registerSale);

module.exports = router;
