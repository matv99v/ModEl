const utils = require('../utils/utils');


module.exports = {
    all() {
        return `
            SELECT *, (SELECT count(*) FROM products WHERE products.idCategory = category.idCategory) AS goodsCount
                FROM category
                ORDER BY CategoryName
            `;
    },

    enabledGoods() {
        return `
            SELECT *, (SELECT count(*) FROM products WHERE products.idCategory = category.idCategory AND exist = true) AS goodsCount
                FROM category
                HAVING goodsCount <> 0
                ORDER BY CategoryName
            `;
    },

};
