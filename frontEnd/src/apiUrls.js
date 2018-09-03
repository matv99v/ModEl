import config from 'AliasSrc/config';

export default {
    existingCategories: `http://${config.baseUrl}/categories/existing`,
    allGoods: `http://${config.baseUrl}/goods`,
    goodDetails(id) {
      return `http://${config.baseUrl}/goods/details/${id}`;
    },
    goodPhotoThumbnail(goodId, imageIndex) {
      return `http://${config.baseUrl}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },
    goodPhotoMedium(goodId, imageIndex) {
      return `http://${config.baseUrl}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },
    defaultGoodPhoto: `http://${config.baseUrl}/svg-images/good_default_image.svg`,
    brandLogo: `http://${config.baseUrl}/svg-images/brand_logo.svg`
}
