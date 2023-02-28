const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/products.model');

const connection = require('../../../src/models/db/connection');
const  { products }  = require('../models/mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModels.findAll();
    // Assert
    expect(result).to.be.deep.equal(products)
  });
  it('Teste de unidade do model para achar id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    console.log([[products[0]]]);
    const result = await productsModels.findById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
