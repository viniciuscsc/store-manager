const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const mockedProducts = require('../mocks/mockedProducts');

describe('productsController tests', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('A função getAllProducts retorna uma lista contendo todos os produtos', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(mockedProducts);
    await productsController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts);
  });

  it('A função getProductById retorna o produto correspondente ao id informado', async function () {
    req.params = { id: 1 };
    sinon.stub(productsService, 'getProductById').resolves(mockedProducts[0]);
    await productsController.getProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts[0]);
  });
});
