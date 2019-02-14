const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));
const http = require('http');
const chalk = require('chalk');


module.exports = {
    getFilesByGoodId(goodId) {
        const pattern = new RegExp(`pht_${goodId}_`);

        if (!fs.existsSync('./public/goods-photos')) {
            // No photos
            return;
        }

        return fs.readdirAsync('./public/goods-photos')
            .then((files) => {
                const mathcedFiles = files.filter(file => file.match(pattern));
                return { [goodId]: mathcedFiles.length };
            });
    },

    // consumes array of existingGoodsIds and returns
    // object of goodsId and amount of photos on server

    getAmountOfPhotos(existingGoodsIds) {
        return Bluebird
            .all(existingGoodsIds.map(goodId => this.getFilesByGoodId(goodId)))
            .then((matches) => {
                const result = matches.reduce((acc, el) => ({
                    ...acc,
                    ...el,
                }), {});
                return result;
            });
    },

    request(url) {
        return new Bluebird((resolve, reject) => {
            http
                .get(url, (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        // resolve(JSON.parse(data).explanation);
                        resolve(data);
                    });
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    },

    log(msg, col = 'yellowBright') { // TODO: to accept multiple arguments for logging
        const avaliableColors = [
            'black',
            'red',
            'green',
            'yellow',
            'blue',
            'magenta',
            'cyan',
            'white',
            'gray',
            'redBright',
            'greenBright',
            'yellowBright',
            'blueBright',
            'magentaBright',
            'cyanBright',
            'whiteBright',
        ];

        let currColor = col;

        if (!avaliableColors.includes(currColor)) {
            currColor = 'yellowBright';
        }

        const strMsg = JSON.stringify(msg, null, 4);
        console.log(chalk[currColor](strMsg));
    },

    wrtieQueryExample(name, options, mysqlQuery) {
        const msg = `# ${(new Date()).toString()}
# Parameters: ${JSON.stringify(options)}
${mysqlQuery}
    `;
        fs.writeFileSync(`./database/examplesSql/${name}.sql`, msg, 'utf8');
    },


    writeQueryResultsToFile(name, options, rawQueryResult) {
        const msg = `# ${(new Date()).toString()}
# Parameters: ${JSON.stringify(options)}
${JSON.stringify(rawQueryResult, null, 4)}
    `;
        fs.writeFileSync(`./database/examplesJson/${name}.json`, msg, 'utf8');
    },


};
