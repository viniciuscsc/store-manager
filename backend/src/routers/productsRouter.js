const { Router } = require('express');

const productsController = require('../controllers/productsController');
const existingProductValidation = require('../middlewares/existingProductValidation');

const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', existingProductValidation, productsController.getProductById);

module.exports = router;
