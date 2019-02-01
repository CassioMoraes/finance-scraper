const Company = require('./stock-details/company');
const BalanceSheet = require('./stock-details/balance-sheet');
const Profitability = require('./stock-details/profitability');
const IncomeStatement = require('./stock-details/income-statement');
const ValuationMeasure = require('./stock-details/valuation-measure');

class StockMapper {
    constructor(_) {
        this._ = _;
    }

    map(scrapedStockInfo, ticker) {
        const company = new Company('', ticker, '');

        company.balanceSheet = this.mapBalanceSheet(scrapedStockInfo);
        company.profitability = this.mapProfitability(scrapedStockInfo);
        company.incomeStatement = this.mapIncomeStatement(scrapedStockInfo);
        company.valuationMeasure = this.mapValuationMeasure(scrapedStockInfo);

        return company;
    }

    mapBalanceSheet(scrapedStockInfo) {
        const totalCash = this.findValue(scrapedStockInfo, 'Total Cash (mrq)');
        const totalDebt = this.findValue(scrapedStockInfo, 'Total Debt (mrq)');

        return new BalanceSheet(totalCash, totalDebt);
    }

    mapProfitability(scrapedStockInfo) {
        return new Profitability(
            this.findValue(scrapedStockInfo, 'Profit Margin'),
            this.findValue(scrapedStockInfo, 'Operating Margin (ttm)'),
        );
    }

    mapIncomeStatement(scrapedStockInfo) {
        return new IncomeStatement(
            this.findValue(scrapedStockInfo, 'Revenue (ttm)'),
            this.findValue(scrapedStockInfo, 'Revenue Per Share (ttm)'),
            this.findValue(scrapedStockInfo, 'Gross Profit (ttm)'),
            this.findValue(scrapedStockInfo, 'EBITDA'),
        );
    }

    mapValuationMeasure(scrapedStockInfo) {
        return new ValuationMeasure(
            this.findValue(scrapedStockInfo, 'Market Cap (intraday) 5'),
            this.findValue(scrapedStockInfo, 'Enterprise Value 3'),
            this.findValue(scrapedStockInfo, 'Trailing P/E'),
            this.findValue(scrapedStockInfo, 'Enterprise Value/EBITDA 6'),
        );
    }

    findValue(scrapedStockInfo, valueName) {
        const info = this._.find(scrapedStockInfo, (info) => {
            return info.name == valueName;
        });

        if (info === undefined) {
            console.log(valueName + ". Not found");
            return null;
        }

        return info.value;
    }
}

module.exports = StockMapper;