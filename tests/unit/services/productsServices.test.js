const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/product.services')

const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

describe('Verificando service', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModels, 'findAll').resolves(mockProducts);

      // act
      const result = await productsServices.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(mockProducts);
    });
  
    it("retorna o produto caso ID exista", async function () {
      sinon.stub(productsModels, 'findById').resolves(mockProducts[0])
      const result = await productsServices.findById(1);
      console.log(result);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mockProducts[0])
    });
  });

  afterEach(function () {
    sinon.restore();
  });
