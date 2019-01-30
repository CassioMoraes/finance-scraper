class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }

    async getStocks() {        
        const stocksInfo = await this.stockService.getStockInfo();
        return stocksInfo;
    }
}

module.exports = StockController;