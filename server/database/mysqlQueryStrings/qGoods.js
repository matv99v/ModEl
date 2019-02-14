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

    insert(data) {
        const obj = { ...data };
        delete obj.textDescrip; // textDescrip is for another table
        const { fields, values } = dbHelpers.pickExistingQuoted(obj, [
          'productName', 'productParams', 'detailName',
        ]);

        const resString = `
            INSERT INTO products (${fields})
                VALUES (${values})
            `;

        utils.wrtieQueryExample('qGoods.insert', obj, resString);
        return resString;
    },

    update(data) {
        const obj = { ...data };
        delete obj.textDescrip; // textDescrip is for another table
        const { fields, values } = dbHelpers.pickExistingQuoted(obj, [
            'productName', 'productParams', 'detailName',
        ]);

        const resString = `
            UPDATE products
                SET
                    ${fields.map((field, i) => `${field} = ${values[i]}`)}
                WHERE
                    idProduct = ${obj.idProduct}
        `;

        utils.wrtieQueryExample('qGoods.update', obj, resString);
        return resString;
    },

};
