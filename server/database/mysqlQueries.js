module.exports = {
    getCategories(obj) {
        // TODO: append amount of each good in each category

        const pickExisting = `WHERE idcategory IN (
                                SELECT DISTINCT idcategory FROM goodsdev.products
                                WHERE exist=1)`;

        return `SELECT * FROM goodsdev.category ${obj.enabled && pickExisting}`;
    },

    getGoods(obj) {
        // enabled - is a special flag for showing the product on UI
        // excludegoodid - exclude one good by id from query
        // catId - get all goods by category
        // goodId - get single good

        const excludeStr = obj.excludegoodid
            ? `products.idProduct !=${obj.excludegoodid}`
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

        let queryStr = [excludeStr, existStr, goodStr, catStr]
            .filter(str => !!str)
            .join(' AND ');

        queryStr = queryStr
            ? `WHERE ${queryStr}`
            : '';

        return  `SELECT * FROM products
                    LEFT JOIN
                        descrip ON products.idProduct = descrip.idProduct ${queryStr}`;
    },

    getStock(obj) {
        return `SELECT * FROM zakupka`;
    }

};
