const mockedSales = [
  { saleId: 1, date: '2023-06-10 00:18:33', productId: 1, quantity: 5 },
  { saleId: 1, date: '2023-06-10 00:18:33', productId: 2, quantity: 10 },
  { saleId: 2, date: '2023-06-10 00:18:33', productId: 3, quantity: 15 },
];

const mockedSaleData = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const mockedNewSale = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const mockedSaleDataProductIdProblem = [
  { productId: undefined, quantity: 1 },
];

const mockedSaleDataQuantityProblem = [
  { productId: 1, quantity: 0 },
];

const mockedSaleDataNonExistentProductId = [
  { productId: 999, quantity: 1 },
];

module.exports = {
  mockedSales,
  mockedSaleData,
  mockedNewSale,
  mockedSaleDataProductIdProblem,
  mockedSaleDataQuantityProblem,
  mockedSaleDataNonExistentProductId,
};
