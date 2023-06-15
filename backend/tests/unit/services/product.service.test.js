const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/product.model');
const productService = require('../../../src/services/product.service');
const {
  mockedProducts,
  mockedProductNotFound,
  mockedProductData,
  mockedNewProduct,
  mockedProductDataError,
} = require('../mocks/product.mock');

describe('Testes unitários de product.service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts retorna todos os produtos cadastrados', async function () {
    sinon.stub(productModel, 'getAllProducts').resolves(mockedProducts);
    const { message } = await productService.getAllProducts();
    expect(message).to.be.deep.equal(mockedProducts);
  });

  describe('getProductById', function () {
    it('retorna o produto correspondente ao id informado', async function () {
      sinon.stub(productModel, 'getProductById').resolves(mockedProducts[0]);
      const { message } = await productService.getProductById(1);
      expect(message).to.be.deep.equal(mockedProducts[0]);
    });
  
    it('retorna "Product not found" caso o id não exista', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const { type, message } = await productService.getProductById(999);
      expect(type).to.be.equal(mockedProductNotFound.type);
      expect(message).to.be.deep.equal(mockedProductNotFound.message);
    });
  });

  describe('registerProduct', function () {
    it('retorna os dados do produto cadastrado no database', async function () {
      sinon.stub(productModel, 'registerProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productModel, 'getProductById').resolves(mockedNewProduct);
      const { type, message } = await productService.registerProduct(mockedProductData);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(mockedNewProduct);
    });
  });

  describe('updateProduct', function () {
    it('retorna "name is required", se name não for informado', async function () {
      const validateProduct = sinon.stub();
      validateProduct.returns({ message: '"name" is required' });
      const { message } = await productService.updateProduct(1, mockedProductDataError);
      expect(message).to.be.equal('"name" is required');
    });

    it('retorna "Product not found" caso o id não exista', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const { type, message } = await productService.updateProduct(999, mockedProductData);
      expect(type).to.be.equal(mockedProductNotFound.type);
      expect(message).to.be.deep.equal(mockedProductNotFound.message);
    });

    it('retorna o produto com os dados atualizados', async function () {
      sinon.stub(productModel, 'updateProduct').resolves({ effectedLines: 1 });
      sinon.stub(productModel, 'getProductById').resolves(mockedNewProduct);
      const { type, message } = await productService.updateProduct(4, mockedProductData);
      expect(type).to.be.equal(null);
      expect(message).to.be.deep.equal(mockedNewProduct);
    });
  });

  describe('deleteProduct', function () {
    it('retorna "Product not found" caso o id não exista', async function () {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const { type, message } = await productService.deleteProduct(999);
      expect(type).to.be.equal(mockedProductNotFound.type);
      expect(message).to.be.deep.equal(mockedProductNotFound.message);
    });

    it('retorna { type: null, message: "" } quando o produto é deletado', async function () {
      sinon.stub(productModel, 'getProductById').resolves(mockedProducts[0]);
      sinon.stub(productModel, 'deleteProduct').resolves({ effectedLines: 1 });
      const { type, message } = await productService.deleteProduct(1);
      expect(type).to.be.equal(null);
      expect(message).to.be.equal('');
    });
  });
});
