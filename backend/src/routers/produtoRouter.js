const { Router } = require('express');

const produtoController = require('../controllers/produtoController');

const router = Router();

router.get('/', produtoController.obterProdutos);

module.exports = router;
