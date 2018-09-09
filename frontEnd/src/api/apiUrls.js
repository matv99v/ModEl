import config from 'AliasSrc/config';

export default {
    existingCategories: `http://${config.baseUrl}/categories/existing`,
    allGoods: `http://${config.baseUrl}/goods`,
    goodsByCategory(catId, excludeGoodId) {
        const excludeStr = excludeGoodId ? `&excludegoodid=${excludeGoodId}` : '';
        return `http://${config.baseUrl}/goods?catId=${catId}${excludeStr}`;
    },
    goodById(goodId) {
        return `http://${config.baseUrl}/goods?goodId=${goodId}`;
    },
    goodDetails(goodId) {
      return `http://${config.baseUrl}/goods/details/${goodId}`;
    },
    goodPhotoThumbnail(goodId, imageIndex) {
      return `http://${config.baseUrl}/images/goods/thumbnail/pht_${goodId}_${imageIndex}.jpg`;
    },
    goodPhotoMedium(goodId, imageIndex) {
      return `http://${config.baseUrl}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },
    defaultGoodPhoto: `http://${config.baseUrl}/svg-images/good_default_image.svg`,
    brandLogo: `http://${config.baseUrl}/svg-images/brand_logo.svg`
}
