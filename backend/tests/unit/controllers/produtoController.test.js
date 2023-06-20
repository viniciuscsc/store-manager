const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// const produtoModel = require('../../../src/models/produtoModel');
const produtoService = require('../../../src/services/produtoService');
const produtoController = require('../../../src/controllers/produtoController');

const {
  produtosMock,
  // produtoNaoEncontradoMock,
  // novoProdutoMock,
} = require('../mocks/produtoMocks');

use(sinonChai);

describe('Testes de produtoController', function () {
  const req = {};
  const res = { end: sinon.stub() };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub();
  });
  
  afterEach(function () {
    sinon.restore();
  });

  it(
    'A função obterProdutos retorna todos os produtos, com status code 200',
    async function () {
      sinon.stub(produtoService, 'obterProdutos').resolves({
        type: null,
        message: produtosMock,
      });

      await produtoController.obterProdutos(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWithExactly(produtosMock);
    },
  );

  describe('A função obterProdutoPorId', function () {
    it(
      'retorna "Product not found", com status code 404, se o id informado não existe no database',
      async function () {
        req.params = { id: 99 };
        sinon.stub(produtoService, 'obterProdutoPorId').resolves({
          type: 'NOT_FOUND',
          message: 'Product not found',
        });

        await produtoController.obterProdutoPorId(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: 'Product not found' });
      },
    );

    it(
      'retorna o produto correspondente ao id informado, com status code 200',
      async function () {
        req.params = { id: 1 };
        sinon.stub(produtoService, 'obterProdutoPorId').resolves({
          type: null,
          message: produtosMock[0],
        });

        await produtoController.obterProdutoPorId(req, res);

        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWithExactly(produtosMock[0]);
      },
    );
  });
});
