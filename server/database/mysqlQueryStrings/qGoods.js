/* eslint indent: 0 */
const utils = require('../../utils/utils.js');
const dbHelpers = require('../../utils/dbHelpers');

module.exports = {
    get(options = {}) {
        const resString = `
            SELECT
                products.idCategory,
                products.idProduct,
                productName,
                productParams,
                declarePrice,
                detailName,
                textDescrip,
                CategoryName,
                exist
            FROM
                category, products
            LEFT JOIN
                descrip ON products.idProduct = descrip.idProduct
                ${
                    dbHelpers.prepareConditions([
                        dbHelpers.include('category.idCategory = products.idCategory').always(),
                        dbHelpers.include('products.idProduct != ?excludeId?').ifObj(options).hasProp('excludeId').exec(),
                        dbHelpers.include('products.exist = ?enabled?').ifObj(options).hasProp('enabled').exec(),
                        dbHelpers.include('products.idProduct = ?goodId?').ifObj(options).hasProp('goodId').exec(),
                        dbHelpers.include('products.idCategory = ?catId?').ifObj(options).hasProp('catId').exec(),
                        dbHelpers.include('products.idProduct = ?id?').ifObj(options).hasProp('id').exec(),
                    ])
                }
        `;

        utils.wrtieQueryExample('qGoods.get', options, resString);
        return resString;
    },

    insert(obj) {
        // textDescrip is for another table
        const resString = `
            INSERT INTO products (
                productName,
                idCategory,
                productParams,
                declarePrice,
                exist,
                detailName
            )
                VALUES (
                    '${obj.productName}',
                    ${obj.idCategory},
                    '${obj.productParams}',
                    ${obj.declarePrice},
                    ${obj.exist},
                    '${obj.detailName}'
                )

        `;
        utils.wrtieQueryExample('qGoods.insertItemInGoods', obj, resString);

        return resString;
    },

    update(obj) {
        const resString = `
            UPDATE products
                SET
                    productName = '${obj.productName}',
                    productParams = '${obj.productParams}',
                    declarePrice = ${obj.declarePrice},
                    exist = ${obj.exist},
                    detailName = '${obj.detailName}'
                WHERE
                    idProduct = ${obj.idProduct}
        `;

        utils.wrtieQueryExample('qGoods.update', obj, resString);
        return resString;
    },

};
