const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/product.model');
const { mockedProducts, mockedNewProduct } = require('../mocks/product.mock');

describe('Testes unitários de product.model', function () {
  afterEach(sinon.restore);

  it('getAllProducts retorna todos os produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([mockedProducts]);
    const result = await productModel.getAllProducts();
    expect(result).to.be.deep.equal(mockedProducts);
  });

  it('getProductById retorna o produto correspondente ao id informado', async function () {
    sinon.stub(connection, 'execute').resolves([[mockedProducts[0]]]);
    const result = await productModel.getProductById(1);
    expect(result).to.be.deep.equal(mockedProducts[0]);
  });

  it('registerProduct cadastra um novo produto no database', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productModel.registerProduct(mockedNewProduct);
    expect(result).to.be.equal(4);
  });
});
