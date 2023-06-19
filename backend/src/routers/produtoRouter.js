const { Router } = require('express');

const produtoController = require('../controllers/produtoController');

const router = Router();

router.get('/', produtoController.obterProdutos);
router.get('/:id', produtoController.obterProdutoPorId);
router.post('/', produtoController.cadastrarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.deletarProduto);

module.exports = router;
