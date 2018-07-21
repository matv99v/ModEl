const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require("fs"));






module.exports = {

    getFilesByGoodId(goodId) {
        const pattern = new RegExp(`pht_${goodId}`);
        return fs.readdirAsync('./public/images/goods')
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
    }




};
