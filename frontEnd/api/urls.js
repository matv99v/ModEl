import helpers from '../helpers/helpers';


export default {

    categories(obj) {
        return `http://${helpers.base}/api/categories` + helpers.obj2query(obj);
    },

    goods(obj) {
        return `http://${helpers.base}/api/goods` + helpers.obj2query(obj);
    },

    putGood(id, obj) {
        return `http://${helpers.base}/api/goods/${id}` + helpers.obj2query(obj);
    },

    barn(obj) {
        return `http://${helpers.base}/api/barn` + helpers.obj2query(obj);
    },

    putBarn(hash, obj) {
        return `http://${helpers.base}/api/barn/${hash}` + helpers.obj2query(obj);
    },

    autocomplete(obj) {
        return `http://${helpers.base}/api/autocomplete` + helpers.obj2query(obj);
    },



    // TODO: get photos by query
    goodPhotoThumbnail(goodId, imageIndex) {
        return `http://${helpers.base}/images/goods/thumbnail/pht_${goodId}_${imageIndex}.jpg`;
    },

    goodPhotoMedium(goodId, imageIndex) {
        return `http://${helpers.base}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },



};
