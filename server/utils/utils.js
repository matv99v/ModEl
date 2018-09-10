const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require("fs"));
const http = require('http');



module.exports = {

    getFilesByGoodId(goodId) {
        const pattern = new RegExp(`pht_${goodId}_`);
        return fs.readdirAsync('./assets/goods-photos')
            .then(files => {
                const mathcedFiles = files.filter(file => file.match(pattern));
                return {[goodId]: mathcedFiles.length};
            });
    },

    // consumes array of existingGoodsIds and returns object of goodsId and amount of photos on server
    getAmountOfPhotos(existingGoodsIds) {
        return Bluebird
            .all(existingGoodsIds.map(goodId => this.getFilesByGoodId(goodId)))
            .then(matches => {
                const result = matches.reduce((acc, el) => ({
                    ...acc,
                    ...el
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
          .on("error", (err) => {
              reject(err);
          });

      });
    },

};
