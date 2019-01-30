class StockService {
    constructor(stockScrapper) {
        this.stockScrapper = stockScrapper;
    }

    async getStockInfo() {
        const stockPath = 'https://br.financas.yahoo.com/quote/BIDI4.SA/key-statistics?p=BIDI4.SA';
        const stocksInfo = await this.stockScrapper.scrapeStockInfo(stockPath);

        return stocksInfo;
    }

}

module.exports = StockService;