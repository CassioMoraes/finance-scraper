const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const options = {
    uri: 'https://br.financas.yahoo.com/quote/BIDI4.SA/key-statistics?p=BIDI4.SA',
    transform: (body) => {
        return cheerio.load(body);
    }
}

requestPromise(options)
    .then(($) => {
        console.log($);

        console.log($('.table-qsp-stats').innerHTML);

        $('.table-qsp-stats').each((table) => {
            console.log("PETable", table.innerHTML);
            console.log();
        });
    })
    .catch((err) => {
        console.log(err);
    });