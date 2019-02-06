const _ = require('lodash');
const sinon = require('sinon');

const StockMapper = require('./stock-mapper');

const scrapedInfoTest = [
    { name: "Market Cap (intraday) 5", value: "4.31B" },
    { name: "Enterprise Value 3", value: "4.49B" },
    { name: "Trailing P/E", value: "57.46" },
    { name: "Enterprise Value/EBITDA 6", value: "N/A" },
    { name: "Profit Margin", value: "16.55%" }
];

describe('#map()', () => {
    test('should return scraped info mapped for company class', async () => {
        const stockMapper = new StockMapper(_);
        const mappedData = stockMapper.map(scrapedInfoTest, 'BIDI4')

        console.log(mappedData);

        expect(mappedData.ticker).toBe('BIDI4');
        expect(mappedData.profitability.profitMargin).toBe('16.55%');
        expect(mappedData.valuationMeasure.marketCap).toBe('4.31B');
        expect(mappedData.valuationMeasure.enterpriseValue).toBe('4.49B');
        expect(mappedData.valuationMeasure.priceEarning).toBe('57.46');
        expect(mappedData.valuationMeasure.evEBITDA).toBe('N/A');
    });
});