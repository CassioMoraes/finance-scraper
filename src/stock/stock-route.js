const express = require('express');
const router = express.Router();

const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');

const StockScraper = require('./stock-scraper');
const StockMapper = require('./stock-mapper');
const StockService = require('./stock-service');
const StockController = require('./stock-controller');

const stockMapper = new StockMapper(_);
const stockScraper = new StockScraper(cheerio, requestPromise);
const stockService = new StockService(stockScraper, stockMapper);
const stockController = new StockController(stockService);

router.get('/get', (req, res, next) => {
    stockController.getStocks().then((stocks) => {
        res.status(201);
        res.json(stocks);
    });
});

module.exports = router;