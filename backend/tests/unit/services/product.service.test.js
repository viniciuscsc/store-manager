const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const { mockedProducts } = require('../mocks/product.mock');

describe('Testes unitários da camada service de "products"', function () {
  afterEach(sinon.restore);

  it('getAllProducts retorna todos os produtos cadastrados', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(mockedProducts);
    const { message } = await productService.getAllProducts();
    expect(message).to.be.deep.equal(mockedProducts);
  });

  it('getProductById retorna o produto correspondente ao id informado', async function () {
    sinon.stub(productModel, 'getProductById').resolves(mockedProducts[0]);
    const { message } = await productService.getProductById(1);
    expect(message).to.be.deep.equal(mockedProducts[0]);
  });
});
