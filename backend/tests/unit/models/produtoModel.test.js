const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const produtoModel = require('../../../src/models/produtoModel');

const { produtosMock } = require('../mocks/produtoMocks');

use(sinonChai);

describe('Testes de produtoModel', function () {
  it('A função obterProdutos retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([produtosMock]);

    const produtos = await produtoModel.obterProdutos();

    expect(produtos).to.be.deep.equal(produtosMock);
  });
});