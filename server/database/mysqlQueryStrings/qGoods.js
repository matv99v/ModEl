const utils = require('../../utils/utils.js');
const dbHelpers = require('../../utils/dbHelpers');

module.exports = {
    get(options = {}) {
        const resString = `
            SELECT idCategory, products.idProduct, productName, productParams, declarePrice, detailName, textDescrip
                FROM products
                LEFT JOIN
                    descrip ON products.idProduct = descrip.idProduct
                    ${
                        dbHelpers.prepareConditions([
                            dbHelpers.include('products.idProduct != ?excludeId?').ifObj(options).hasProp('excludeId').exec(),
                            dbHelpers.include('products.exist = ?enabled?').ifObj(options).hasProp('enabled').exec(),
                            dbHelpers.include('products.idProduct = ?goodId?').ifObj(options).hasProp('goodId').exec(),
                            dbHelpers.include('products.idCategory = ?catId?').ifObj(options).hasProp('catId').exec(),
                        ])
                    }
        `;

        utils.wrtieQueryExample('qGoods.get', options, resString);
        return resString;
    },

};
