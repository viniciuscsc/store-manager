const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const vendaModel = require('../../../src/models/vendaModel');

const {
  vendasMock,
  dadosVendaMock,
} = require('../mocks/vendaMocks');

use(sinonChai);

describe('Testes de vendaModel', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('A função obterVendas retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([vendasMock]);

    const vendas = await vendaModel.obterVendas();

    expect(vendas).to.be.deep.equal(vendasMock);
  });

  it(
    'A função obterVendaPorId retorna a venda correspondente ao id informado',
    async function () {
      sinon.stub(connection, 'execute').resolves([vendasMock[2]]);

      const venda = await vendaModel.obterVendaPorId(2);

      expect(venda).to.be.deep.equal(vendasMock[2]);
    },
  );

  it(
    'A função cadastrarVenda cadastra uma venda no database e retorna o insertId',
    async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const idVenda = await vendaModel.cadastrarVenda(dadosVendaMock);

      expect(idVenda).to.be.equal(3);
    },
  );

  it('A função atualizarVenda atualiza uma venda no database', async function () {
    sinon.stub(connection, 'execute').resolves([[{ date: vendasMock[0].date }]]);

    const dataVenda = await vendaModel.atualizarVenda(
      vendasMock[0].saleId,
      vendasMock[0].productId,
      { quantity: 10 },
    );

    expect(dataVenda).to.be.equal(vendasMock[0].date);
  });

  it(
    'A função deletarVenda deleta a venda do database correspondente ao id informado',
    async function () {
      sinon.stub(connection, 'execute').resolves();

      await vendaModel.deletarVenda(1);

      expect(connection.execute).to.be.callCount(2);
    },
  );
});
