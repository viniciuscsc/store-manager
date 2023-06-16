const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const saleModel = require('../../../src/models/sale.model');
const saleService = require('../../../src/services/sale.service');
const connection = require('../../../src/models/connection');

const { mockedProducts } = require('../mocks/product.mock');

const {
  mockedSales,
  mockedSaleDataProductIdProblem,
  mockedSaleDataQuantityProblem,
  mockedSaleDataNonExistentProductId,
  mockedNewSale,
  mockedNotFoundSale,
} = require('../mocks/sale.mock');

const RETORNO = 'quantity must be greater than zero';

describe('Testes unitários de sale.service', function () {
  afterEach(function () {
    sinon.restore();
  });

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

  describe('registerSale', function () {
    it('retorna "productId is required", se productId não for informado', async function () {
      const validateProductIdSale = sinon.stub();
      validateProductIdSale.returns({ message: '"productId" is required' });

      const { message } = await saleService.registerSale(mockedSaleDataProductIdProblem);
      expect(message).to.be.equal('"productId" is required');
    });

    it(`retorna "${RETORNO}", se quantity é menor ou igual a zero`, async function () {
      const validateQuatitySale = sinon.stub();
      validateQuatitySale.returns({ message: '"quantity" must be greater than or equal to 1' });

      const { message } = await saleService.registerSale(mockedSaleDataQuantityProblem);
      expect(message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it(
      'retorna "Product not found", se uma venda tem um campo productId inexistente',
      async function () {
        sinon.stub(productModel, 'getAllProducts').resolves(mockedProducts);

        const validateProductIdExists = sinon.stub();
        validateProductIdExists.returns({ message: 'Product not found' });

        const { message } = await saleService.registerSale(mockedSaleDataNonExistentProductId);
        expect(message).to.be.equal('Product not found');
      },
    );

    it('retorna o id da nova venda', async function () {
      sinon.stub(productModel, 'getAllProducts').resolves(mockedProducts);

      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      
      sinon.stub(saleModel, 'registerSale').resolves(mockedNewSale);

      const { type, message } = await saleService.registerSale(mockedNewSale.itemsSold);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(mockedNewSale);
    });
  });

  describe('deleteSale', function () {
    it('retorna "Sale not found" se o id não existe', async function () {
      sinon.stub(saleModel, 'getSaleById').resolves(undefined);
      
      const { type, message } = await saleService.deleteSale(999);
      expect(type).to.be.equal(mockedNotFoundSale.type);
      expect(message).to.be.equal(mockedNotFoundSale.message);
    });

    it('retorna { type: null, message: "" } quando a venda é deletada', async function () {
      sinon.stub(saleModel, 'getSaleById').resolves(mockedSales[0]);

      sinon.stub(saleModel, 'deleteSale').resolves({ effectedLines: 1 });

      const { type, message } = await saleService.deleteSale(1);
      expect(type).to.be.equal(null);
      expect(message).to.be.equal('');
    });
  });
});
