const Company = require('./stock-details/company');
const BalanceSheet = require('./stock-details/balance-sheet');
const Profitability = require('./stock-details/profitability');
const IncomeStatement = require('./stock-details/income-statement');
const ValuationMeasure = require('./stock-details/valuation-measure');
const StockSanitizer = require('./stock-sanitizer');

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

        return new BalanceSheet(
            StockSanitizer.sanitize(totalCash),
            StockSanitizer.sanitize(totalDebt)
        );
    }

    mapProfitability(scrapedStockInfo) {
        const profitMargin = this.findValue(scrapedStockInfo, 'Profit Margin');
        const operatingMargin = this.findValue(scrapedStockInfo, 'Operating Margin (ttm)');

        return new Profitability(
            StockSanitizer.sanitize(profitMargin),
            StockSanitizer.sanitize(operatingMargin)
        );
    }

    mapIncomeStatement(scrapedStockInfo) {
        const revenue = this.findValue(scrapedStockInfo, 'Revenue (ttm)');
        const revenuePerShare = this.findValue(scrapedStockInfo, 'Revenue Per Share (ttm)');
        const grossProfit = this.findValue(scrapedStockInfo, 'Gross Profit (ttm)');
        const ebitda = this.findValue(scrapedStockInfo, 'EBITDA');

        return new IncomeStatement(
            StockSanitizer.sanitize(revenue),
            StockSanitizer.sanitize(revenuePerShare),
            StockSanitizer.sanitize(grossProfit),
            StockSanitizer.sanitize(ebitda)
        );
    }

    mapValuationMeasure(scrapedStockInfo) {
        const marketCap = this.findValue(scrapedStockInfo, 'Market Cap (intraday) 5');
        const enterpriseValue = this.findValue(scrapedStockInfo, 'Enterprise Value 3');
        const priceEarning = this.findValue(scrapedStockInfo, 'Trailing P/E');
        const evEBITDA = this.findValue(scrapedStockInfo, 'Enterprise Value/EBITDA 6');

        return new ValuationMeasure(
            StockSanitizer.sanitize(marketCap),
            StockSanitizer.sanitize(enterpriseValue),
            StockSanitizer.sanitize(priceEarning),
            StockSanitizer.sanitize(evEBITDA)
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