const produtosMock = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const novoProdutoMock = { name: 'ProdutoX' };

const produtoNaoEncontradoMock = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

module.exports = {
  produtosMock,
  novoProdutoMock,
  produtoNaoEncontradoMock,
};
