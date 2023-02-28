const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');
const productsModels = require('../../../src/models/products.model');
const {
  newSaleMock,
  fullSaleMock,
  productsMock,
  noQuantitySaleMock,
  noIdSaleMock,
  invalidQuantityMock,
  invalidIdProductMock,
  saleWithTimeMock,
} = require('../../unit/models/mocks/sales.services.mock');

  describe('Testes de cadastrar vendas', function () {
    it('Lista todas as vendas', async function () {
      // arrange
      sinon.stub(salesModels, 'findAllSales').resolves(saleWithTimeMock);
      // act
      const result = await salesServices.findAllSales();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleWithTimeMock);
    });

    it('Lista uma única venda pelo Id', async function () {
      // arrange
      sinon.stub(salesModels, 'findSalesById').resolves(saleWithTimeMock);
      // act
      const result = await salesServices.salesById(1);
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleWithTimeMock);
    });
  });
afterEach(function () {
  sinon.restore();
});
