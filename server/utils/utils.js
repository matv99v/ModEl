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

    log(msg, bg = 'green') { // TODO: to accept multiple arguments for logging
        const avaliableColors = [
            'bgBlack',
            'bgRed',
            'bgGreen',
            'bgYellow',
            'bgBlue',
            'bgMagenta',
            'bgCyan',
            'bgWhite',
            'bgBlackBright',
            'bgRedBright',
            'bgGreenBright',
            'bgYellowBright',
            'bgBlueBright',
            'bgMagentaBright',
            'bgCyanBright',
            'bgWhiteBright',
        ];

        let currColor = 'bg' + bg.charAt(0).toUpperCase() + bg.substr(1);

        if (!avaliableColors.includes(currColor)) {
            currColor = 'bgMagentaBright';
        }

        const strMsg = JSON.stringify(msg);
        console.log(chalk[currColor](strMsg));
    },

};
