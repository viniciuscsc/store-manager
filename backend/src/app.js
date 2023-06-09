const express = require('express');

const app = express();

const productsRouters = require('./routers/productsRouter');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouters);

module.exports = app;
