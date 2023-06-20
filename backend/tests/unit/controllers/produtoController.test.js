const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const produtoService = require('../../../src/services/produtoService');
const produtoController = require('../../../src/controllers/produtoController');

const PRODUCT_NOT_FOUND = 'Product not found';

const {
  produtosMock,
  novoProdutoMock,
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
          message: PRODUCT_NOT_FOUND,
        });

        await produtoController.obterProdutoPorId(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: PRODUCT_NOT_FOUND });
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

  describe('A função cadastrarProduto', function () {
    it(
      'retorna "name is required", com status code 400, se a requisição não tiver o campo "name"',
      async function () {
        sinon.stub(produtoService, 'cadastrarProduto').resolves({
          type: 'VALUE_IS_REQUIRED',
          message: '"name" is required',
        });

        await produtoController.cadastrarProduto(req, res);

        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith({ message: '"name" is required' });
      },
    );

    it(
      `retorna "name length must be at least 5 characters long", com status code 422, se a 
      requisição não tiver "name" com pelo menos 5 caracteres`,
      async function () {
        sinon.stub(produtoService, 'cadastrarProduto').resolves({
          type: 'SMALL_VALUE',
          message: '"name" length must be at least 5 characters long',
        });

        await produtoController.cadastrarProduto(req, res);

        expect(res.status).to.be.calledWith(422);
        expect(res.json).to.be.calledWith({
          message: '"name" length must be at least 5 characters long',
        });
      },
    );

    it('retorna o produto cadastrado, com status code 201', async function () {
      sinon.stub(produtoService, 'cadastrarProduto').resolves({
        type: null,
        message: { id: 4, name: novoProdutoMock.name },
      });

      await produtoController.cadastrarProduto(req, res);

      expect(res.status).to.be.calledWith(201);
      expect(res.json).to.be.calledWithExactly({ id: 4, name: novoProdutoMock.name });
    });
  });

  describe('A função atualizarProduto', function () {
    it(
      'retorna "Product not found", com status code 404, se o id informado não existe no database',
      async function () {
        sinon.stub(produtoService, 'atualizarProduto').resolves({
          type: 'NOT_FOUND',
          message: PRODUCT_NOT_FOUND,
        });

        await produtoController.atualizarProduto(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: PRODUCT_NOT_FOUND });
      },
    );

    it(
      'retorna "name is required", com status code 400, se a requisição não tiver o campo "name"',
      async function () {
        sinon.stub(produtoService, 'atualizarProduto').resolves({
          type: 'VALUE_IS_REQUIRED',
          message: '"name" is required',
        });

        await produtoController.atualizarProduto(req, res);

        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith({ message: '"name" is required' });
      },
    );

    it(
      `retorna "name length must be at least 5 characters long", com status code 422, se a 
      requisição não tiver "name" com pelo menos 5 caracteres`,
      async function () {
        sinon.stub(produtoService, 'atualizarProduto').resolves({
          type: 'SMALL_VALUE',
          message: '"name" length must be at least 5 characters long',
        });

        await produtoController.atualizarProduto(req, res);

        expect(res.status).to.be.calledWith(422);
        expect(res.json).to.be.calledWith({
          message: '"name" length must be at least 5 characters long',
        });
      },
    );

    it('retorna o produto atualizado, com status code 200', async function () {
      sinon.stub(produtoService, 'atualizarProduto').resolves({
        type: null,
        message: { id: 1, name: novoProdutoMock.name }, 
      });

      await produtoController.atualizarProduto(req, res);

      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWithExactly({ id: 1, name: novoProdutoMock.name });
    });
  });

  describe('A função deletarProduto', function () {
    it(
      'retorna "Product not found", com status code 404, se o id informado não existe no database',
      async function () {
        sinon.stub(produtoService, 'deletarProduto').resolves({
          type: 'NOT_FOUND',
          message: PRODUCT_NOT_FOUND,
        });

        await produtoController.deletarProduto(req, res);

        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: PRODUCT_NOT_FOUND });
      },
    );

    it('retorna o status code 204 e finaliza a resposta', async function () {
      sinon.stub(produtoService, 'deletarProduto').resolves({ type: null, message: '' });

      await produtoController.deletarProduto(req, res);

      expect(res.status).to.be.calledWith(204);
      expect(res.end).to.be.calledOnceWith();
    });
  });
});
