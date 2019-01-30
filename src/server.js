const express = require('express');
const app = express();
const cors = require('cors');

const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const StockScrapper = require('./stock/stock-scrapper');
const StockService = require('./stock/stock-service');
const StockController = require('./stock/stock-controller');

const stockScrapper = new StockScrapper(cheerio, requestPromise);
const stockService = new StockService(stockScrapper);
const stockController = new StockController(stockService);

app.use(cors());

app.get('/getStocks', function (req, res) {
    stockController.getStocks()
        .then((stocks) => {
            res.json(stocks);
        });
});

app.listen(3030);