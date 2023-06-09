const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const mockedProducts = require('../mocks/mockedProducts');

describe('Testes de productsModel', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('A função getAllProducts retorna uma lista contendo todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockedProducts]);
    const result = await productsModel.getAllProducts();
    expect(result).to.be.deep.equal(mockedProducts);
  });

  it('A função getProductById retorna o produto correspondente ao id informado', async function () {
    sinon.stub(connection, 'execute').resolves([[mockedProducts[0]]]);
    const result = await productsModel.getProductById(1);
    expect(result).to.be.deep.equal(mockedProducts[0]);
  });
});
