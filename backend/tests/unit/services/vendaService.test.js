const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// const connection = require('../../../src/models/connection');
const vendaModel = require('../../../src/models/vendaModel');
const vendaService = require('../../../src/services/vendaService');
const produtoModel = require('../../../src/models/produtoModel');

const {
  vendasMock,
  dadosVendaMock,
  vendaSemProductIdMock,
  vendaSemQuantitydMock,
  vendaProductIdZeroMock,
  vendaQuantityZeroMock,
  vendaProductIdNaoExisteMock,
} = require('../mocks/vendaMocks');

const { produtosMock } = require('../mocks/produtoMocks');

use(sinonChai);

describe('Testes de vendaService', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('A função obterVendas retorna todas as vendas', async function () {
    sinon.stub(vendaModel, 'obterVendas').resolves(vendasMock);

    const { type, message } = await vendaService.obterVendas();

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal(vendasMock);
  });

  describe('A função obterVendaPorId', function () {
    it(
      'retorna "Sale not found" se o id informado não existe no database',
      async function () {
        sinon.stub(vendaModel, 'obterVendaPorId').resolves(undefined);

        const { type, message } = await vendaService.obterVendaPorId(99);

        expect(type).to.be.equal('NOT_FOUND');
        expect(message).to.be.equal('Sale not found');
      },
    );

    it('retorna a venda correspondente ao id informado', async function () {
      sinon.stub(vendaModel, 'obterVendaPorId').resolves([vendasMock[2]]);

      const { type, message } = await vendaService.obterVendaPorId(2);

      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal([vendasMock[2]]);
    });
  });

  describe('A função cadastrarVenda', function () {
    it(
      'retorna "productId is required" se algum elemento não tiver o campo "productId"',
      async function () {
        const { type, message } = await vendaService.cadastrarVenda(vendaSemProductIdMock);

        expect(type).to.be.equal('VALUE_IS_REQUIRED');
        expect(message).to.be.equal('"productId" is required');
      },
    );

    it(
      'retorna "quantity is required" se algum elemento não tiver o campo "quantity"',
      async function () {
        const { type, message } = await vendaService.cadastrarVenda(vendaSemQuantitydMock);

        expect(type).to.be.equal('VALUE_IS_REQUIRED');
        expect(message).to.be.equal('"quantity" is required');
      },
    );

    it(
      `retorna "productId must be greater than or equal to 1" se algum elemento tiver o campo 
      "productId" menor ou igual a zero`,
      async function () {
        const { type, message } = await vendaService.cadastrarVenda(vendaProductIdZeroMock);

        expect(type).to.be.equal('SMALL_VALUE');
        expect(message).to.be.equal('"productId" must be greater than or equal to 1');
      },
    );

    it(
      `retorna "quantity must be greater than or equal to 1" se algum elemento tiver o campo 
      "quantity" menor ou igual a zero`,
      async function () {
        const { type, message } = await vendaService.cadastrarVenda(vendaQuantityZeroMock);

        expect(type).to.be.equal('SMALL_VALUE');
        expect(message).to.be.equal('"quantity" must be greater than or equal to 1');
      },
    );

    it(
      'retorna "Product not found" se algum elemento tiver um productId que não existe no database',
      async function () {
        sinon.stub(produtoModel, 'obterProdutos').resolves(produtosMock);

        const { type, message } = await vendaService.cadastrarVenda(vendaProductIdNaoExisteMock);

        expect(type).to.be.equal('NOT_FOUND');
        expect(message).to.be.equal('Product not found');
      },
    );

    it('retorna a nova venda cadastrada', async function () {
      sinon.stub(vendaModel, 'cadastrarVenda').resolves(3);
      sinon.stub(produtoModel, 'obterProdutos').resolves(produtosMock);

      const { type, message } = await vendaService.cadastrarVenda(dadosVendaMock);

      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal({ id: 3, itemsSold: dadosVendaMock });
    });
  });
});
