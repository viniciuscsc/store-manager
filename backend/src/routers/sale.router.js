const { Router } = require('express');

const saleController = require('../controllers/sale.controller');
const existingSaleValidation = require('../middlewares/existingSaleValidation');

const router = Router();

router.get('/', saleController.getAllSales);
router.get('/:id', existingSaleValidation, saleController.getAllSales);

module.exports = router;
