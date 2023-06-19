const { Router } = require('express');

const vendaController = require('../controllers/vendaController');

const router = Router();

router.get('/', vendaController.obterVendas);

module.exports = router;
