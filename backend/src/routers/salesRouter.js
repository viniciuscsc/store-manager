const { Router } = require('express');

const salesController = require('../controllers/salesController');
const existingSaleValidation = require('../middlewares/existingSaleValidation');

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:id', existingSaleValidation, salesController.getSaleById);

module.exports = router;
