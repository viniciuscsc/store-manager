const { Router } = require('express');

const productController = require('../controllers/product.controller');
const productFieldValidation = require('../middlewares/productFieldValidation');

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productFieldValidation, productController.registerProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
