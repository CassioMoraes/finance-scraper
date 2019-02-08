const _ = require('lodash');

const StockMapper = require('./stock-mapper');

const scrapedInfoTest = [
    { name: "Market Cap (intraday) 5", value: "4.31B" },
    { name: "Enterprise Value 3", value: "4.49M" },
    { name: "Trailing P/E", value: "57.46" },
    { name: "Enterprise Value/EBITDA 6", value: "N/A" },
    { name: "Profit Margin", value: "16.55%" }
];

describe('#map()', () => {
    test('should return scraped info mapped for company class', async () => {
        const stockMapper = new StockMapper(_);
        const mappedData = stockMapper.map(scrapedInfoTest, 'BIDI4', 'www.test.com')

        expect(mappedData.ticker).toBe('BIDI4');
        expect(mappedData.address).toBe('www.test.com');
        expect(mappedData.profitability.profitMargin).toBe(16.55);
        expect(mappedData.valuationMeasure.marketCap).toBe(4310000000);
        expect(mappedData.valuationMeasure.enterpriseValue).toBe(4490000);
        expect(mappedData.valuationMeasure.priceEarning).toBe(57.46);
        expect(mappedData.valuationMeasure.evEBITDA).toBeNull();
    });
});