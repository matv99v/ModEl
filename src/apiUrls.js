import config from 'AliasSrc/config';

export default {
    existingCategories: `http://${config.baseUrl}/categories/existing`,
    allGoods: `http://${config.baseUrl}/goods`,
    goodPhoto(goodId, imageIndex) {
      return `http://${config.baseUrl}/images/goods/pht_${goodId}_${imageIndex}.jpg`;
    },
    defaultGoodPhoto: `http://${config.baseUrl}/images/goods/good_default_image.png`,
    goodDetails(id) {
      return `http://${config.baseUrl}/goods/details/${id}`;
    },
    brandLogo: `http://${config.baseUrl}/images/brand/brand_logo2.svg`
}
