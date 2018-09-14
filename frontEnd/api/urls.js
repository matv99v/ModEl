import helpers from '../helpers/helpers.js';


export default {

    categories(obj) {
        return `http://${helpers.base}/api/categories` + helpers.obj2query(obj);
    },

    goods(obj) {
        return `http://${helpers.base}/api/goods` + helpers.obj2query(obj);
    },




    defaultGoodPhoto: `http://${helpers.base}/svg-images/good_default_image.svg`,
    brandLogo: `http://${helpers.base}/svg-images/brand_logo.svg`,
    goodPhotoThumbnail(goodId, imageIndex) {
        return `http://${helpers.base}/images/goods/thumbnail/pht_${goodId}_${imageIndex}.jpg`;
    },
    goodPhotoMedium(goodId, imageIndex) {
        return `http://${helpers.base}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },


    allGoods: `http://${helpers.base}/goods`,


    // goodsByCategory(catId, excludeGoodId) {
    //     const excludeStr = excludeGoodId ? `&excludegoodid=${excludeGoodId}` : '';
    //     return `http://${helpers.base}/goods?catId=${catId}${excludeStr}`;
    // },
    goodById(goodId) {
        return `http://${helpers.base}/goods?goodId=${goodId}`;
    },




};
