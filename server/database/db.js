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
    getAllGoodsCategories() {
        return db.queryAsync('SELECT * FROM goods.category')
    },

    getAllGoods() {
        return db.queryAsync('SELECT * FROM goods.products')
    }
};
