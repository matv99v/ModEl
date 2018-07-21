const mysql = require('mysql');
const Bluebird = require('bluebird');

const connection = mysql.createConnection({
    host: "109.95.32.134",
    user: "seller",
    password: "_SeLlEr_",
    database: "goods"
});

const db = Bluebird.promisifyAll(connection);

module.exports = {
    getAllCategories() {
        return db.queryAsync('SELECT * FROM goods.category');
    },

    getExistingCategories() {
        return db.queryAsync('SELECT * FROM category where idcategory in (select distinct idcategory from products)');
    },

    getAllGoods() {
        return db.queryAsync('SELECT * FROM goods.products');
    },

    getGoodById(id) {
        return db.queryAsync('SELECT * FROM goods.products');
    }
};
