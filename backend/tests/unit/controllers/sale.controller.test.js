const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

use(sinonChai);

const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const { mockedSales } = require('../mocks/sale.mock');

describe('Testes unitários da camada controller de "sales"', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  
  afterEach(function () {
    sinon.restore();
  });

  it('getAllSales retorna todas as vendas cadastradas', async function () {
    sinon.stub(saleService, 'getAllSales').resolves(mockedSales);
    await saleController.getAllSales(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedSales);
  });

  it('getSaleById retorna a venda correspondente ao id informado', async function () {
    req.params = { id: 1 };
    sinon.stub(saleService, 'getSaleById').resolves(mockedSales[0]);
    await saleController.getSaleById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedSales[0]);
  });
});
