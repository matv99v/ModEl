/* eslint indent: 0 */
const utils = require('../../utils/utils.js');
const dbHelpers = require('../../utils/dbHelpers');

module.exports = {
    get(options = {}) {

        console.warn('<<<<<>>>>>GGGEEETTT', options);
        const resString = `
            SELECT
                idCategory,
                products.idProduct,
                productName,
                productParams,
                declarePrice,
                detailName,
                textDescrip
            FROM
                products
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
            ${
                options.id
                    ? `WHERE products.idProduct = ${options.id}`
                    : ''
            }
        `;

        utils.wrtieQueryExample('qGoods.get', options, resString);
        return resString;
    },

    insert(obj) {
        console.warn('>>>>>>>>>>INSERT GOOD', obj);
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


};
