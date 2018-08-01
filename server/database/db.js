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
        return db.queryAsync('SELECT * FROM category where idcategory in (select distinct idcategory from products where exist=1)');
    },

    getAllGoods() {
        return db.queryAsync('SELECT * FROM goods.products');
    },

    // TODO: make request by id
    getGoodById(id) {
    },

    getGoodDetailsById(id) {
        return db.queryAsync(`select textDescrip from goods.descrip where idProduct=${id}`);
    }
};
