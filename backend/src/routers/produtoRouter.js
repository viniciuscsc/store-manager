const { Router } = require('express');

const produtoController = require('../controllers/produtoController');

const router = Router();

router.get('/', produtoController.obterProdutos);
router.get('/:id', produtoController.obterProdutoPorId);
router.post('/', produtoController.cadastrarProduto);

module.exports = router;
