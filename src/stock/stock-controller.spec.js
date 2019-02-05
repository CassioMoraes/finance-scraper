const sinon = require('sinon');

const Company = require('./stock-details/company');
const StockService = require('./stock-service');
const StockController = require('./stock-controller');

const stock = new Company('Banco Inter', 'BIDI4', 'http://www.bancointer.test');

const mockStockService = new StockService(null, null);
const stockServiceStub = sinon.stub(mockStockService, 'getStockInfo')
stockServiceStub.returns([stock]);

describe('#getStocks()', () => {
    test('should return stock collection with 1 stock', async () => {
        const stockController = new StockController(mockStockService);
        const returnedStocks = await stockController.getStocks();

        expect(returnedStocks.length).toBe(1);
    });

    it('should return BIDI4 stock', async () => {
        const stockController = new StockController(mockStockService);
        const returnedStocks = await stockController.getStocks();

        expect(returnedStocks[0].ticker).toBe('BIDI4');
    });
});