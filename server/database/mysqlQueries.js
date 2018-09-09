// TODO: remove db name from all queries, since it is set in db.js via connection

module.exports = {
    getAllCategories() {
        return 'SELECT * FROM category';
    },

    getExistingCategories() {
        return 'SELECT * FROM category where idcategory in (select distinct idcategory from products where exist=1)';
    },

    getAllGoods() {
        return 'SELECT * FROM products';
    },

    // TODO: make request by id
    getGoodById(id) {
    },

    getGoodDetailsById(id) {
        return `SELECT textDescrip from descrip where idProduct=${id}`;
    }

};
