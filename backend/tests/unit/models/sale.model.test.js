const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const saleModel = require('../../../src/models/sale.model');
const {
  mockedSales,
  mockedSaleData,
  mockedNewSale,
} = require('../mocks/sale.mock');

describe('Testes unitários de sale.model', function () {
  afterEach(sinon.restore);

  it('getAllSales retorna todas as vendas cadastradas', async function () {
    sinon.stub(connection, 'execute').resolves([mockedSales]);
    const result = await saleModel.getAllSales();
    expect(result).to.be.deep.equal(mockedSales);
  });

  it('getSaleById retorna a venda correspondente ao id informado', async function () {
    sinon.stub(connection, 'execute').resolves([mockedSales[0]]);
    const result = await saleModel.getSaleById(1);
    expect(result).to.be.deep.equal(mockedSales[0]);
  });

  it('registerSale cadastra uma nova venda no database', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await saleModel.registerSale(mockedSaleData);
    expect(result).to.be.deep.equal(mockedNewSale);
    expect(result.itemsSold).to.deep.equal(mockedSaleData);
  });
});
