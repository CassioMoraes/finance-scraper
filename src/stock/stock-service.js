class StockService {
    constructor(stockScrapper, stockMapper) {
        this.stockScrapper = stockScrapper;
        this.stockMapper = stockMapper;
    }

    async getStockInfo() {
        const ticker = 'BIDI4';
        const stockPath = 'https://finance.yahoo.com/quote/' + ticker + '.SA/key-statistics?p=' + ticker + '.SA';
        const scrapedInfo = await this.stockScrapper.scrapeStockInfo(stockPath);

        const stocksInfo = this.stockMapper.map(scrapedInfo, ticker);

        return stocksInfo;
    }

}

module.exports = StockService;