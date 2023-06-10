const { Router } = require('express');

const productController = require('../controllers/product.controller');
const existingProductValidation = require('../middlewares/existingProductValidation');

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', existingProductValidation, productController.getProductById);

module.exports = router;
