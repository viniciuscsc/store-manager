const vendasMock = [
  {
    saleId: 1,
    date: '2023-06-20T02:27:09.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-20T02:27:09.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-20T02:27:09.000Z',
    productId: 3,
    quantity: 15,
  },
];

const dadosVendaMock = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const vendaSemProductIdMock = [
  { quantity: 1 },
  { productId: 2, quantity: 5 },
];

const vendaSemQuantitydMock = [
  { productId: 1 },
  { productId: 2, quantity: 5 },
];

const vendaProductIdZeroMock = [
  { productId: 0, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const vendaQuantityZeroMock = [
  { productId: 1, quantity: 0 },
  { productId: 2, quantity: 5 },
];

const vendaProductIdNaoExisteMock = [
  { productId: 99, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const itemVendidoAtualizadoMock = {
  date: '2023-06-20T02:27:09.000Z',
  productId: 1,
  quantity: 20,
  saleId: 1,
};

module.exports = {
  vendasMock,
  dadosVendaMock,
  vendaSemProductIdMock,
  vendaSemQuantitydMock,
  vendaProductIdZeroMock,
  vendaQuantityZeroMock,
  vendaProductIdNaoExisteMock,
  itemVendidoAtualizadoMock,
};
