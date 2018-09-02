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

    // TODO: make request by id
    getGoodById(id) {
    },

    getGoodDetailsById(id) {
        return `SELECT textDescrip from goods.descrip where idProduct=${id}`;
    }

};
