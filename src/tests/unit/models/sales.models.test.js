const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../src/models/sales.models');

const connection = require('../../../src/models/db/connection');
const { allSales } = require('../models/mocks/sales.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allSales]);
    // Act
    const result = await salesModels.findAllSales();
    // Assert
    expect(result).to.be.deep.equal(allSales)
  });
  it('Teste de unidade do model para achar id', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModels.findSalesById(1);

    expect(result).to.be.deep.equal(allSales);
  });

  afterEach(function () {
    sinon.restore();
  });
});