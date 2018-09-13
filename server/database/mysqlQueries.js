// TODO: remove db name from all queries, since it is set in db.js via connection

module.exports = {
    getAllCategories() {
        return 'SELECT * FROM category';
    },

    getExistingCategories() {
        // TODO: get amount of each good in each category
        return 'SELECT * FROM category where idcategory in (select distinct idcategory from products where exist=1)';
    },

    getAllGoods() {
        return 'SELECT * FROM products';
    },

    getGoodsByCategoryId(catId, excludegoodid) {
        const excludeStr = excludegoodid ? ` AND products.idProduct !=${excludegoodid}` : '';
        return  `SELECT
                    products.idProduct,
                    products.productName,
                    products.idCategory,
                    products.productParams,
                    products.declarePrice,
                    products.detailName,
                    descrip.textDescrip
                FROM
                    products
                LEFT JOIN
                    descrip ON products.idProduct = descrip.idProduct
                WHERE
                    products.exist = 1
                    AND
                        products.idCategory = ${catId}
                    ${excludeStr}`;
    },

    getGoodById(goodId) {
        return  `SELECT
                    products.idProduct,
                    products.productName,
                    products.idCategory,
                    products.productParams,
                    products.declarePrice,
                    products.detailName,
                    descrip.textDescrip
                FROM
                    products
                LEFT JOIN
                    descrip ON products.idProduct = descrip.idProduct
                WHERE
                    products.exist = 1 AND products.idProduct = ${goodId}`;
    },

    getGoodDetailsById(id) {
        return `SELECT textDescrip from descrip where idProduct=${id}`;
    }

};
