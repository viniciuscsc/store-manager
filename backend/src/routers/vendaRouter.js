const { Router } = require('express');

const vendaController = require('../controllers/vendaController');

const router = Router();

router.get('/', vendaController.obterVendas);
router.get('/:id', vendaController.obterVendaPorId);
router.post('/', vendaController.cadastrarVenda);
router.put('/:saleId/products/:productId/quantity', vendaController.atualizarVenda);
router.delete('/:id', vendaController.deletarVenda);

module.exports = router;
