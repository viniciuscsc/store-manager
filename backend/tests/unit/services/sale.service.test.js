const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/sale.model');
const saleService = require('../../../src/services/sale.service');
const { mockedSales } = require('../mocks/sale.mock');

describe('Testes unitários de sale.service', function () {
  afterEach(sinon.restore);

  it('getAllSales retorna todas as vendas cadastradas', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(mockedSales);
    const { message } = await saleService.getAllSales();
    expect(message).to.be.deep.equal(mockedSales);
  });

  it('getSaleById retorna a venda correspondente ao id informado', async function () {
    sinon.stub(saleModel, 'getSaleById').resolves(mockedSales[0]);
    const { message } = await saleService.getSaleById(1);
    expect(message).to.be.deep.equal(mockedSales[0]);
  });
});
