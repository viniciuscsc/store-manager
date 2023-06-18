const { Router } = require('express');

const produtoController = require('../controllers/produtoController');

const router = Router();

router.get('/', produtoController.obterProdutos);
router.get('/:id', produtoController.obterProdutoPorId);

module.exports = router;
