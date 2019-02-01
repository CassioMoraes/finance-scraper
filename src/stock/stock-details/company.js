class Company {
    constructor(name, ticker, address) {
        this.name = name;
        this.ticker = ticker;
        this.address = address;
        this.balanceSheet = null;
        this.profitability = null;
        this.incomeStatement = null;
    }
}

module.exports = Company;