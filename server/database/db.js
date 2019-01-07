const { performQuery } = require('./dbConnection');
const qCategories = require('./mysqlQueryStrings/qCategories.js');
const qGoods = require('./mysqlQueryStrings/qGoods.js');
const qGoodsDescription = require('./mysqlQueryStrings/qGoodsDescription.js');
const qBarn = require('./mysqlQueryStrings/qBarn.js');
const qAutocomplete = require('./mysqlQueryStrings/qAutocomplete.js');
const qUserhash = require('./mysqlQueryStrings/qUserhash.js');


module.exports = {
    getCategories(options) {
        return performQuery(qCategories.get(options));
    },

    getBarn(options) {
        return performQuery(qBarn.get(options));
    },

    postItemToBarn(options) {
        return performQuery(qBarn.insert(options));
    },

    updateItemInBarn(options) {
        return performQuery(qBarn.update(options));
    },

    getAutocomplete(options) {
        return performQuery(qAutocomplete.get(options));
    },

    getUserHash(options) {
        return performQuery(qUserhash.get(options));
    },

    getGoods(options) {
        return performQuery(qGoods.get(options));
    },

    postItemToGoods(options) {
        return performQuery(qGoods.insert(options));
    },

    postItemToGoodsDescription(options) {
        return performQuery(qGoodsDescription.insert(options));
    },

    updateGoodDescription(options) {
        return performQuery(qGoodsDescription.update(options));
    },

    updateGood(options) {
        return performQuery(qGoods.update(options));
    },
};
