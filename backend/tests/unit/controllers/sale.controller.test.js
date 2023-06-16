const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

use(sinonChai);

const saleService = require('../../../src/services/sale.service');
const saleController = require('../../../src/controllers/sale.controller');
const {
  mockedSales,
  mockedNewSale,
} = require('../mocks/sale.mock');

describe('Testes unitários de sale.controller', function () {
  const req = {};
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub();
  });
  
  afterEach(function () {
    sinon.restore();
  });

  it('getAllSales retorna todas as vendas cadastradas', async function () {
    sinon.stub(saleService, 'getAllSales').resolves({ message: mockedSales });

    await saleController.getAllSales(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedSales);
  });

  it('getSaleById retorna a venda correspondente ao id informado', async function () {
    req.params = { id: 1 };
    sinon.stub(saleService, 'getSaleById').resolves({ message: mockedSales[0] });

    await saleController.getSaleById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedSales[0]);
  });

  it('registerSale retorna o id da nova venda cadastrada', async function () {
    sinon.stub(saleService, 'registerSale').resolves({ message: mockedNewSale.id });

    await saleController.registerSale(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(mockedNewSale.id);
  });

  it('deleteSale retorna o status 204 e finaliza a resposta', async function () {
    req.params = { id: 1 };
    sinon.stub(saleService, 'deleteSale').resolves({ type: null });

    await saleController.deleteSale(req, res);

    expect(saleService.deleteSale).to.be.calledWith(1);
    expect(res.status).to.be.calledWith(204);
    expect(res.end).to.be.calledOnceWith();
  });
});
