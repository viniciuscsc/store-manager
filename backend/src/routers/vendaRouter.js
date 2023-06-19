const { Router } = require('express');

const vendaController = require('../controllers/vendaController');

const router = Router();

router.get('/', vendaController.obterVendas);
router.get('/:id', vendaController.obterVendaPorId);

module.exports = router;
