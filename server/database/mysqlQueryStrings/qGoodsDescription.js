const utils = require('../../utils/utils.js');

module.exports = {
    insert(obj) {
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

    update(obj) {
        const resString = `
            UPDATE descrip
                SET
                    textDescrip = '${obj.textDescrip}'
                WHERE
                    descrip.idProduct = ${obj.idProduct}
        `;
        utils.wrtieQueryExample('qGoods.update', obj, resString);
        return resString;
    },

};
