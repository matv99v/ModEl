const utils = require('../../utils/utils');


function prepearePredicate(str, arg) {
    return typeof arg === 'undefined'
        ? 'TRUE' // if no such argument then resolve predicate as TRUE so it does not affect overall db query
        : `${str}${arg}`;
}

function isObjPropsAllowed(obj, allowedProps) {
    return !Object.keys(obj).some(key => !allowedProps.includes(key));
}

const allowedFields = ['catId', 'enabled', 'exlcudeId', 'goodId'];

module.exports = {
    get(obj = {}) {
        if (!isObjPropsAllowed(obj, allowedFields)) {
            throw new Error(`Passed props are not allowed: ${JSON.stringify(obj)}`);
        }
        const resString = `
            SELECT idCategory, products.idProduct, productName, productParams, declarePrice, detailName, textDescrip
                FROM products
                LEFT JOIN
                    descrip ON products.idProduct = descrip.idProduct
                    WHERE
                        ${prepearePredicate('products.idProduct !=', obj.exlcudeId)}
                    AND
                        ${prepearePredicate('products.exist =', obj.enabled)}
                    AND
                        ${prepearePredicate('products.idProduct =', obj.goodId)}
                    AND
                        ${prepearePredicate('products.idCategory =', obj.catId)}
        `;

        utils.wrtieQueryExample('qGoods.get', obj, resString);
        return resString;
    },

};
