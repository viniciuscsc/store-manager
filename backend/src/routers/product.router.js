const { Router } = require('express');

const productController = require('../controllers/product.controller');

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.registerProduct);

module.exports = router;
