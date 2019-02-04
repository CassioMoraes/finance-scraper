const sinon = require('sinon');
const _ = require('lodash');

const StockMapper = require('./stock-mapper');
const StockScraper = require('./stock-scraper');
const StockService = require('./stock-service');

const stockMapper = new StockMapper(_);
const mockStockScraper = new StockScraper(null, null);
const stockScraperStub = sinon.stub(mockStockScraper, 'scrapeStockInfo')
stockScraperStub.returns([]);

describe('#getStockInfo()', () => {
    test('should return  BIDI4 stock information', async () => {
        const stockService = new StockService(mockStockScraper, stockMapper);
        const returnedStockInfo = await stockService.getStockInfo();

        expect(returnedStockInfo.ticker).toBe("BIDI4");        
    });
});