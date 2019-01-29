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

        $("tr").each(function () {

            console.log();

            var info = [];

            $(this).find("td[data-reactid]").each(function () {

                var infoOnCell = $(this).text();

                if (infoOnCell.length > 1)
                    info.push($(this).text());
            });

            if (info.length != 2)
                console.log("Invalid collection");
            else 
                console.log(info[0] + ': ' + info[1]);
        });

        console.log();        
    })
    .catch((err) => {
        console.log(err);
    });