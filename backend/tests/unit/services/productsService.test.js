const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const mockedProducts = require('../mocks/mockedProducts');

describe('productsService tests', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('A função getAllProducts retorna uma lista contendo todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(mockedProducts);
    const result = await productsService.getAllProducts();
    expect(result).to.be.deep.equal(mockedProducts);
  });

  it('A função getProductById retorna o produto correspondente ao id informado', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(mockedProducts[0]);
    const result = await productsService.getProductById(1);
    expect(result).to.be.deep.equal(mockedProducts[0]);
  });
});
