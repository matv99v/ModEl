const { prepearePredicate, includeIfPassed } = require('../../utils/dbHelpers');
const dbHelpers = require('../../utils/dbHelpers');
const utils = require('../../utils/utils');


const quotes = ['zakDate', 'zakLink', 'zakDateShp', 'zakDateRcv', 'zakDateProtct'];


const queryAdditionVal = {
    all: 'TRUE',
    actual: 'restQnty <> frozQnty',
    pendingshp: 'zakDateShp IS NULL',
    intransit: 'zakDateShp IS NOT NULL AND zakDateRcv IS NULL',
};


function get(obj) {
    const options = { ...obj };

    if (obj.hash) {
        options.zakNum = obj.hash.split('-')[0];
        options.idProd = obj.hash.split('-')[1];
    }

    options.exclFlds = obj.excludeFields ? obj.excludeFields.split(',') : [];

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
    ].filter(field => !options.exclFlds.some(exF => field.match(new RegExp(exF, 'i')))); // exclude some fields

    const resString = `
        SELECT
            ${fields}
        FROM
            zakupka,
            products,
            category
        WHERE
            zakupka.idProduct = products.idProduct

            ${dbHelpers.include('AND zakNumber = ?zakNum?').ifObj(options).hasProp('zakNum').exec()}

            ${dbHelpers.include('AND zakupka.idProduct = ?idProd?').ifObj(options).hasProp('idProd').exec()}

            AND category.idCategory = (SELECT
                idCategory
            FROM
                products
            WHERE
                idProduct = zakupka.idProduct)

            ${dbHelpers.include('AND restQnty <> frozQnty').ifObj(options).hasProp('queryAddition').equalTo('actual').exec()}
            ${dbHelpers.include('AND zakDateShp IS NULL').ifObj(options).hasProp('queryAddition').equalTo('pendingshp').exec()}
            ${dbHelpers.include('AND zakDateShp IS NOT NULL AND zakDateRcv IS NULL').ifObj(options).hasProp('queryAddition').equalTo('intransit').exec()}

        ORDER BY CategoryName, productName
    `;

    utils.wrtieQueryExample('qBarn.get', options, resString);
    return resString;
}

function getOld(obj) {
    const zakNum = obj.hash ? obj.hash.split('-')[0] : null;
    const idProd = obj.hash ? obj.hash.split('-')[1] : null;
    const qAdd = obj.queryAddition ? queryAdditionVal[obj.queryAddition] : null;
    const exclFlds = obj.excludeFields ? obj.excludeFields.split(',') : [];

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
    ].filter(field => !exclFlds.some(exF => field.match(new RegExp(exF, 'i')))); // exclude some fields

    const resString = `
        SELECT
            ${fields}
        FROM
            zakupka,
            products,
            category
        WHERE
            zakupka.idProduct = products.idProduct

            AND
                ${prepearePredicate('zakNumber =', zakNum)}
            AND
                ${prepearePredicate('zakupka.idProduct =', idProd)}

            AND category.idCategory = (SELECT
                idCategory
            FROM
                products
            WHERE
                idProduct = zakupka.idProduct)

            AND
                ${prepearePredicate('', qAdd)}

        ORDER BY CategoryName, productName
    `;

    utils.wrtieQueryExample('qBarn.getOld', obj, resString);
    return resString;
}

function insert(obj) {
    const fields = Object.keys(obj);
    const values = fields.map(key => (quotes.includes(key) && obj[key] !== null
        ? `'${obj[key]}'`
        : obj[key]));

    const resString = `INSERT INTO zakupka (${fields})
                VALUES (${values})
            `;

    utils.wrtieQueryExample('qBarn.postItemToBarn', obj, resString);
    return resString;
}

function update(obj) {
    const fields = Object.keys(obj);

    const queryStr = fields
        .map(key => (quotes.includes(key) && obj[key] !== null ? `'${obj[key]}'` : obj[key]))
        .map((val, i) => `${fields[i]}=${val}`);

    const resString = `UPDATE zakupka
                SET ${queryStr}
                WHERE idProduct = ${obj.idProduct} AND zakNumber = ${obj.zakNumber}
            `;

    utils.wrtieQueryExample('qBarn.updateItemInBarn', obj, resString);
    return resString;
}

// function getBarnTransactionById(obj) {
//     const resString = `
//         SELECT *,
//             FROM zakupka
//             WHERE idProduct = ${obj.idProduct}
//                 AND zakNumber = ${obj.zakNumber}
//     `;
//
//     utils.wrtieQueryExample('qBarn.getBarnTransactionById', obj, resString);
//     return resString;
// }

module.exports = {
    get,
    getOld,
    insert,
    update,
    // getBarnTransactionById,
};
