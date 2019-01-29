const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');
const stringify = require('csv-stringify');

const options = {
    uri: 'https://br.financas.yahoo.com/quote/BIDI4.SA/key-statistics?p=BIDI4.SA',
    transform: (body) => {
        return cheerio.load(body);
    }
}

requestPromise(options)
    .then(($) => {

        var csv = [];
        var tickerInfo = [];

        $("tr").each(function () {

            console.log();

            var info = [];

            $(this).find("td[data-reactid]").each(function () {

                var infoOnCell = $(this).text();

                if (infoOnCell.length > 1)
                    info.push($(this).text());
            });

            if (info.length == 2)
                tickerInfo.push({ name: info[0], value: info[1] });
        });

        if (csv.length == 0) {
            var csvHeader = [];

            csvHeader.push("Empresa");

            _.map(tickerInfo, (ticker) => {
                csvHeader.push(ticker.name);
            });

            csv.push(csvHeader);
        }

        var csvTicker = [];

        csvTicker.push("BIDI4")

        _.map(tickerInfo, (ticker) => {
            csvTicker.push(ticker.value);
        });

        csv.push(csvTicker);

        stringify(csv, function (err, output) {
            console.log(output);
        });
    })
    .catch((err) => {
        console.log(err);
    });