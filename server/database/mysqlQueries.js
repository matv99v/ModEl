const utils = require('../utils/utils');
const queryCategories = require('./queryCategories.js');

function createQuery(arr) {
    const queryStr = arr
        .filter(str => !!str)
        .join(' AND ');

    return queryStr
        ? `WHERE ${queryStr}`
        : '';
}


// TODO: refactor mysql queries

module.exports = {
    getCategories(obj) {
        return obj.enabled
            ? queryCategories.enabledGoods()
            : queryCategories.all();
    },

    getGoods(obj) {
        // enabled - is a special flag for showing the product on UI
        // exlcudeId - exclude one good by id from query
        // catId - get all goods by category
        // goodId - get single good

        const excludeStr = obj.exlcudeId
            ? `products.idProduct !=${obj.exlcudeId}`
            : '';

        const existStr = obj.enabled
            ? `products.exist = ${obj.enabled}`
            : '';

        const goodStr = obj.goodId
            ? `products.idProduct = ${obj.goodId}`
            : '';

        const catStr = obj.catId
            ? `products.idCategory = ${obj.catId}`
            : '';

        const queryStr = createQuery([excludeStr, existStr, goodStr, catStr]);

        const res = `SELECT idCategory, products.idProduct, productName, productParams, declarePrice, detailName, textDescrip
                    FROM products
                    LEFT JOIN
                        descrip ON products.idProduct = descrip.idProduct ${queryStr}`;
        return res;
    },

    getBarn(obj) {
        const exludeFields = obj.exclideFields ? obj.exclideFields.split(',') : [];

        const fields = [
            'CategoryName',
            'products.idCategory',
            'curRate',
            'frozQnty',
            'zakupka.idProduct',
            'productName',
            'restQnty',
            'zakLink',
            'zakNumber',
            'zakQnty',
            'zakSum',
            'DATE_FORMAT(zakDate, "%Y-%m-%d") AS zakDate',
            'DATE_FORMAT(zakDateRcv, "%Y-%m-%d") AS zakDateRcv',
            'DATE_FORMAT(zakDateShp, "%Y-%m-%d") AS zakDateShp',
            'DATE_FORMAT(zakDateProtct, "%Y-%m-%d") AS zakDateProtct', // TODO: think on date formatting (maybe return as epoch)
        ].filter(field => !exludeFields.some(exF => field.match(new RegExp(exF, 'i'))));

        const replaceIdStr = 'zakupka.idProduct = products.idProduct';
        const replaceCategoryStr = 'category.idCategory = (SELECT idCategory FROM products WHERE idProduct = zakupka.idProduct)';

        let hashStr;
        if (obj.hash) {
            const hashArr = obj.hash.split('-');
            hashStr = `zakNumber = ${hashArr[0]} AND zakupka.idProduct = ${hashArr[1]}`;
        }

        const queryStr = createQuery([replaceIdStr, hashStr, replaceCategoryStr, obj.queryAddition]);

        const res = `SELECT ${fields}
                FROM zakupka, products, category
                ${queryStr}
                ORDER BY CategoryName, productName`;

        return res;
    },

    addStock(obj) {
    },

    // performGoodsAutocomplete(obj) {
    //     return `SELECT *
    //                FROM products
    //                WHERE productName LIKE '%${obj.like}%'`;
    // },
    //
    // performCategoriesAutocomplete(obj) {
    //     return `SELECT *
    //                FROM category
    //                WHERE CategoryName LIKE '%${obj.like}%'`;
    // },

    getAutocomplete(obj) {
        return `SELECT *
                   FROM ${obj.table}
                   WHERE ${obj.field} LIKE '%${obj.like}%'`;
   },


    // text fields
    quotes: ['zakDate', 'zakLink', 'zakDateShp', 'zakDateRcv', 'zakDateProtct'],

    postItemToBarn(obj) {
        const fields = Object.keys(obj);
        const values = fields.map(key => (this.quotes.includes(key) && obj[key] !== null
            ? `'${obj[key]}'`
            : obj[key]));

        return `INSERT INTO zakupka (${fields})
                    VALUES (${values})
                `;
    },

    updateItemInBarn(obj) {
        const fields = Object.keys(obj);

        const queryStr = fields
            .map(key => (this.quotes.includes(key) && obj[key] !== null ? `'${obj[key]}'` : obj[key]))
            .map((val, i) => `${fields[i]}=${val}`);


        return `UPDATE zakupka
                    SET ${queryStr}
                    WHERE idProduct = ${obj.idProduct} AND zakNumber = ${obj.zakNumber}
                `;
    },

    getBarnTransactionById(obj) {
        return `
        SELECT *,
            FROM zakupka
            WHERE idProduct = ${obj.idProduct}
                AND zakNumber = ${obj.zakNumber}
        `;
    },

    getUserHash(obj) {
        return `SELECT * FROM userlist
            WHERE usrLogin = '${obj.username}'`;
    },
};
