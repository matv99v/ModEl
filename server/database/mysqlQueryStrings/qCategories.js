const utils = require('../../utils/utils');
const dbHelpers = require('../../utils/dbHelpers');

module.exports = {
    get(options) {
        const goodsCountQuery = `
            SELECT count(*)
                FROM products
                    WHERE products.idCategory = category.idCategory
                    ${dbHelpers.include('AND exist = ?enabled?').ifObj(options).hasProp('enabled').exec()}
        `;

        const resString = `
            SELECT *, (${goodsCountQuery}) AS goodsCount
                FROM category
                    ${dbHelpers.include('HAVING goodsCount <> ?excludeProductsCount?').ifObj(options).hasProp('excludeProductsCount').exec()}
                    ORDER BY CategoryName
        `;

        utils.wrtieQueryExample('qCategories.get', options, resString);
        return resString;
    },
};
