const fs = require('fs');
const sinon = require('sinon');
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

const StockScraper = require('./stock-scraper');

describe('#scrapeStockInfo()', () => {
    test('should return dictionary with 59 values', async () => {
        const pageHTML = fs.readFileSync(__dirname + '/../test-files/test-page.html', "utf8");
        const cheerioObject = cheerio.load(pageHTML);
        
        const requestPromiseStub = sinon.stub(requestPromise, 'Request');
        requestPromiseStub.resolves(cheerioObject);

        const stockScraper = new StockScraper(cheerio, requestPromise);
        const scrapedData = await stockScraper.scrapeStockInfo('');

        expect(scrapedData.length).toBe(59);
    });
});