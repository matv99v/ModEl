const utils = require('../../utils/utils');
const dbHelpers = require('../../utils/dbHelpers');


// TODO: move checkAllowedProps to express middlevare

module.exports = {
    get(options) {
        const allowedProps = {
            // enabled - pick categories with exist=true flag (show or hide on UI)
            enabled: {
                type: 'bool',
            },
            // excludeProductsCount - exclude categories with products count number,
            // usually used with 0
            excludeProductsCount: {
                type: 'number',
            },
        };

        utils.checkAllowedProps(options, allowedProps);

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

    getOld(options) {
        const allowedProps = {
            // enabled - pick categories with exist=true flag (show or hide on UI)
            enabled: {
                type: 'bool',
            },
            // excludeProductsCount - exclude categories with products count number,
            // usually used with 0
            excludeProductsCount: {
                type: 'number',
            },
        };
        utils.checkAllowedProps(options, allowedProps);

        const goodsCountQuery = `
            SELECT count(*)
                FROM products
                    WHERE products.idCategory = category.idCategory
                    ${Object.prototype.hasOwnProperty.call(options, 'enabled') ? `AND exist = ${options.enabled}` : ''}
        `;

        const resString = `
            SELECT *, (${goodsCountQuery}) AS goodsCount
                FROM category
                    ${options.excludeProductsCount ? `HAVING goodsCount <> ${options.excludeProductsCount}` : ''}
                    ORDER BY CategoryName
        `;

        utils.wrtieQueryExample('qCategories.getOld', options, resString);
        return resString;
    },

};
