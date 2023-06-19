const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const produtoModel = require('../../../src/models/produtoModel');

const {
  produtosMock,
  novoProdutoMock,
} = require('../mocks/produtoMocks');

use(sinonChai);

describe('Testes de produtoModel', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('A função obterProdutos retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([produtosMock]);

    const produtos = await produtoModel.obterProdutos();

    expect(produtos).to.be.deep.equal(produtosMock);
  });

  it(
    'A função obterProdutoPorId retorna o produto correspondente ao id informado',
    async function () {
      sinon.stub(connection, 'execute').resolves([[produtosMock[0]]]);

      const produto = await produtoModel.obterProdutoPorId(1);

      expect(produto).to.be.deep.equal(produtosMock[0]);
    },
  );

  it(
    'A função cadastrarProduto cadastra um produto no database e retorna o insertId',
    async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const id = await produtoModel.cadastrarProduto(novoProdutoMock);

      expect(id).to.be.equal(4);
    },
  );

  it('A função atualizarProduto atualiza um produto no database', async function () {
    sinon.stub(connection, 'execute').resolves();

    await produtoModel.atualizarProduto(1, novoProdutoMock);

    expect(connection.execute).to.be.callCount(1);
  });

  it(
    'A função deletarProduto deleta o produto do database correspondente ao id informado',
    async function () {
      sinon.stub(connection, 'execute').resolves();

      await produtoModel.deletarProduto(1);

      expect(connection.execute).to.be.callCount(1);
    },
  );
});