const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// const connection = require('../../../src/models/connection');
const produtoModel = require('../../../src/models/produtoModel');
const produtoService = require('../../../src/services/produtoService');

const {
  produtosMock,
  produtoNaoEncontradoMock,
  novoProdutoMock,
} = require('../mocks/produtoMocks');

use(sinonChai);

describe('Testes de produtoService', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('A função obterProdutos retorna todos os produtos', async function () {
    sinon.stub(produtoModel, 'obterProdutos').resolves(produtosMock);

    const { type, message } = await produtoService.obterProdutos();

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal(produtosMock);
  });

  describe('A função obterProdutoPorId', function () {
    it(
      'retorna "Product not found" se o id informado não existe no database',
      async function () {
        sinon.stub(produtoModel, 'obterProdutoPorId').resolves(undefined);

        const { type, message } = await produtoService.obterProdutoPorId(99);

        expect(type).to.be.equal(produtoNaoEncontradoMock.type);
        expect(message).to.be.equal(produtoNaoEncontradoMock.message);
      },
    );

    it(
      'retorna retorna o produto correspondente ao id informado',
      async function () {
        sinon.stub(produtoModel, 'obterProdutoPorId').resolves(produtosMock[0]);

        const { type, message } = await produtoService.obterProdutoPorId(1);

        expect(type).to.be.equal(null);
        expect(message).to.be.deep.equal(produtosMock[0]);
      },
    );
  });

  describe('A função cadastrarProduto', function () {
    it('retorna "name is required" se a requisição não tiver o campo "name"', async function () {
      const produtoSemName = {};

      const { type, message } = await produtoService.cadastrarProduto(produtoSemName);

      expect(type).to.be.equal('VALUE_IS_REQUIRED');
      expect(message).to.be.equal('"name" is required');
    });

    it(
      `retorna "name length must be at least 5 characters long" se a requisição não 
      tiver "name" com pelo menos 5 caracteres`,
      async function () {
        const produtoNameCurto = { name: 'abc' };

        const { type, message } = await produtoService.cadastrarProduto(produtoNameCurto);

        expect(type).to.be.equal('SMALL_VALUE');
        expect(message).to.be.equal('"name" length must be at least 5 characters long');
      },
    );

    it('retorna o novo produto cadastrado', async function () {
      sinon.stub(produtoModel, 'cadastrarProduto').resolves(4);

      const { type, message } = await produtoService.cadastrarProduto(novoProdutoMock);

      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal({
        id: 4,
        name: novoProdutoMock.name,
      });
    });
  });

  describe('A função atualizarProduto', function () {
    it(
      'retorna "Product not found" se o id informado não existe no database',
      async function () {
        sinon.stub(produtoModel, 'obterProdutoPorId').resolves(undefined);

        const { type, message } = await produtoService.atualizarProduto(99, novoProdutoMock);

        expect(type).to.be.equal('NOT_FOUND');
        expect(message).to.be.equal('Product not found');
      },
    );

    it('retorna "name is required" se a requisição não tiver o campo "name"', async function () {
      sinon.stub(produtoModel, 'obterProdutoPorId').resolves(produtosMock[0]);

      const produtoSemName = {};

      const { type, message } = await produtoService.atualizarProduto(1, produtoSemName);

      expect(type).to.be.equal('VALUE_IS_REQUIRED');
      expect(message).to.be.equal('"name" is required');
    });

    it('retorna o produto atualizado', async function () {
      sinon.stub(produtoModel, 'obterProdutoPorId').resolves(produtosMock[0]);
      sinon.stub(produtoModel, 'atualizarProduto').resolves();

      const { type, message } = await produtoService.atualizarProduto(1, novoProdutoMock);

      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal({
        id: 1,
        name: novoProdutoMock.name,
      });
    });
  });

  describe('A função deletarProduto', function () {
    it(
      'retorna "Product not found" se o id informado não existe no database',
      async function () {
        sinon.stub(produtoModel, 'obterProdutoPorId').resolves(undefined);

        const { type, message } = await produtoService.deletarProduto(99);

        expect(type).to.be.equal('NOT_FOUND');
        expect(message).to.be.equal('Product not found');
      },
    );

    it('retorna { type: null, message: "" }', async function () {
      sinon.stub(produtoModel, 'obterProdutoPorId').resolves(produtosMock[0]);
      sinon.stub(produtoModel, 'deletarProduto').resolves();

      const { type, message } = await produtoService.deletarProduto(1);

      expect(type).to.be.equal(null);
      expect(message).to.be.equal('');
    });
  });
});
