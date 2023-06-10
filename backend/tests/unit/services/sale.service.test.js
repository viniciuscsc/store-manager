const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/sale.model');
const saleService = require('../../../src/services/sale.service');
const { mockedSales } = require('../mocks/sale.mock');

describe('Testes unitários da camada service de "sales"', function () {
  afterEach(sinon.restore);

  it('getAllSales retorna todas as vendas cadastradas', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(mockedSales);
    const result = await saleService.getAllSales();
    expect(result).to.be.deep.equal(mockedSales);
  });

  it('getSaleById retorna a venda correspondente ao id informado', async function () {
    sinon.stub(saleModel, 'getSaleById').resolves(mockedSales[0]);
    const result = await saleService.getSaleById(1);
    expect(result).to.be.deep.equal(mockedSales[0]);
  });
});
