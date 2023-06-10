const express = require('express');

const productRouter = require('./routers/product.router');
const saleRouter = require('./routers/sale.router');

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', saleRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
