const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

use(sinonChai);

const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');

const {
  mockedProducts,
  mockedNewProduct,
  mockedUpdatedProduct,
} = require('../mocks/product.mock');

describe('Testes unitários de product.controller', function () {
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
  
  it('getAllProducts retorna todos os produtos cadastrados', async function () {
    sinon.stub(productService, 'getAllProducts').resolves({ message: mockedProducts });
    await productController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts);
  });

  it('getProductById retorna o produto correspondente ao id informado', async function () {
    req.params = { id: 1 };
    sinon.stub(productService, 'getProductById').resolves({ message: mockedProducts[0] });
    await productController.getProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedProducts[0]);
  });

  it('registerProduct retorna o novo produto cadastrado', async function () {
    sinon.stub(productService, 'registerProduct').resolves({ message: mockedNewProduct });

    await productController.registerProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(mockedNewProduct);
  });

  it('updateProduct retorna o produto com os dados atualizados', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ message: mockedUpdatedProduct });
    
    await productController.updateProduct(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockedUpdatedProduct);
  });

  it('deleteProduct retorna o status 204 e finaliza a resposta', async function () {
    req.params = { id: 1 };
    sinon.stub(productService, 'deleteProduct').resolves({ type: null });

    await productController.deleteProduct(req, res);

    expect(productService.deleteProduct).to.be.calledWith(1);
    expect(res.status).to.be.calledWith(204);
    expect(res.end).to.be.calledOnceWith();
  });
});
