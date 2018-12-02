const utils = require('../../utils/utils.js');
// const dbHelpers = require('../../utils/dbHelpers');

module.exports = {
    insert(obj) {
        console.warn('>>>>>>>>>>INSERT DESCRIP', obj);

        const resString = `
            INSERT INTO descrip (
                textDescrip,
                idProduct
            )
                VALUES (
                    '${obj.textDescrip}',
                    ${obj.idProduct}
                )

        `;
        utils.wrtieQueryExample('qGoodsDescription.insert', obj, resString);

        return resString;
    },


};
