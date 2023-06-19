const express = require('express');

const productoRouter = require('./routers/produtoRouter');
const vendaController = require('./routers/vendaRouter');

const app = express();

app.use(express.json());

app.use('/products', productoRouter);
app.use('/sales', vendaController);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
