const mockedProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const mockedProductNotFound = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const mockedProductData = {
  name: 'Produto X',
};

const mockedNewProduct = {
  id: 4,
  name: 'Produto X',
};

module.exports = {
  mockedProducts,
  mockedProductNotFound,
  mockedProductData,
  mockedNewProduct,
};
