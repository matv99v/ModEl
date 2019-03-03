const utils = require('../../utils/utils.js');
const dbHelpers = require('../../utils/dbHelpers.js');

module.exports = {
    insert(obj) {
        const { fields, values } = dbHelpers.pickExistingQuoted(obj, ['textDescrip']);
        const resString = `
            INSERT INTO descrip (${fields})
                VALUES (${values})
            `;
        utils.wrtieQueryExample('qGoodsDescription.insert', obj, resString);
        return resString;
    },

    update(obj) {
        const { fields, values } = dbHelpers.pickExistingQuoted(obj, ['textDescrip']);
        const resString = `
            UPDATE descrip
                SET
                    ${fields.map((field, i) => `${field} = ${values[i]}`)}
                WHERE
                  descrip.idProduct = ${obj.idProduct}
        `;
        utils.wrtieQueryExample('qGoodsDescription.update', obj, resString);
        return resString;
    },

};
