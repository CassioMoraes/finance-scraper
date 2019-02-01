const express = require('express');
const app = express();
const cors = require('cors');

const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

const StockScrapper = require('./stock/stock-scrapper');
const StockMapper = require('./stock/stock-mapper');
const StockService = require('./stock/stock-service');
const StockController = require('./stock/stock-controller');

const stockMapper = new StockMapper(_);
const stockScrapper = new StockScrapper(cheerio, requestPromise);
const stockService = new StockService(stockScrapper, stockMapper);
const stockController = new StockController(stockService);

app.use(cors());

app.get('/getStocks', function (req, res) {
    stockController.getStocks()
        .then((stocks) => {
            res.json(stocks);
        });
});

app.listen(3030);