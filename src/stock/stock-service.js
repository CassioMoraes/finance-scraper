class StockService {
    constructor(stockScrapper, stockMapper) {
        this.stockScrapper = stockScrapper;
        this.stockMapper = stockMapper;
    }

    async getStockInfo() {
        const ticker = 'BIDI4';
        const stockAddress = 'https://finance.yahoo.com/quote/' + ticker + '.SA/key-statistics?p=' + ticker + '.SA';
        const scrapedInfo = await this.stockScrapper.scrapeStockInfo(stockAddress);

        const stocksInfo = this.stockMapper.map(scrapedInfo, ticker, stockAddress);

        return stocksInfo;
    }

}

module.exports = StockService;