const { Router } = require('express');

const saleController = require('../controllers/sale.controller');

const router = Router();

router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.registerSale);
router.delete('/:id', saleController.deleteSale);
router.put('/:saleId/products/:productId/quantity', saleController.updateProductQuantity);

module.exports = router;
