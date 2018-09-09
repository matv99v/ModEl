module.exports = {
    getAllCategories() {
        return 'SELECT * FROM goods.category';
    },

    getExistingCategories() {
        return 'SELECT * FROM category where idcategory in (select distinct idcategory from products where exist=1)';
    },

    getAllGoods() {
        return 'SELECT * FROM goods.products';
    },

    getGoodsByCategoryId(catId, excludegoodid) {
        const excludeStr = excludegoodid ? ` AND goods.products.idProduct !=${excludegoodid}` : '';
        return  `SELECT
                    goods.products.idProduct,
                    goods.products.productName,
                    goods.products.idCategory,
                    goods.products.productParams,
                    goods.products.declarePrice,
                    goods.products.detailName,
                    goods.descrip.textDescrip
                FROM
                    goods.products
                LEFT JOIN
                    goods.descrip ON goods.products.idProduct = goods.descrip.idProduct
                WHERE
                    goods.products.exist = 1
                    AND
                        goods.products.idCategory = ${catId}
                    ${excludeStr}`;
    },

    getGoodById(goodId) {
        return  `SELECT
                    goods.products.idProduct,
                    goods.products.productName,
                    goods.products.idCategory,
                    goods.products.productParams,
                    goods.products.declarePrice,
                    goods.products.detailName,
                    goods.descrip.textDescrip
                FROM
                    goods.products
                LEFT JOIN
                    goods.descrip ON goods.products.idProduct = goods.descrip.idProduct
                WHERE
                    goods.products.exist = 1 AND goods.products.idProduct = ${goodId}`;
    },

    getGoodDetailsById(id) {
        return `SELECT textDescrip from goods.descrip where idProduct=${id}`;
    },



};
