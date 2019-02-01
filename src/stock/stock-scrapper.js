'use strict';

class StockScrapper {
    constructor(cheerio, requestPromise) {
        this.cheerio = cheerio;
        this.requestPromise = requestPromise;
    }

    scrapeStockInfo(tickerPath) {
        const options = {
            uri: tickerPath,
            transform: (body) => {
                return this.cheerio.load(body);
            }
        }

        return this.requestPromise(options)
            .then(($) => {
                const tickerInfo = [];

                $("tr").each(function () {
                    const info = [];

                    $(this).find("td[data-reactid]").each(function () {

                        const infoOnCell = $(this).text();

                        if (infoOnCell.length > 1)
                            info.push($(this).text().trim());
                    });

                    if (info.length == 2)
                        tickerInfo.push({ name: info[0], value: info[1] });
                });

                return tickerInfo;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = StockScrapper;