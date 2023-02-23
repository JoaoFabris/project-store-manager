const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsModels = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/product.services');
const productsController = require('../../../src/controllers/products.controller');

const connection = require('../../../src/models/db/connection');

const productByMock = {
  name: 'Martelo de Thor',
};

const newProductByMock = { id: 1, ...productByMock };

const productListByMock = [newProductByMock];

const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

describe('Teste de unidade do passengerController', function () {
  // ...

  describe('Teste unidade controller', function () {
    it('lista os produtos e retorno o status 200', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: null, message: mockProducts });

      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    });
    it('Retorna status 200 quando o id procurado existir no banco de dados', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findById')
        .resolves({ type: 200, message: mockProducts[0] })
      
      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts[0])
    })
  });

  afterEach(function () {
    sinon.restore();
  });
});