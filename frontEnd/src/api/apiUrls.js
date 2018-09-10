export default {
    existingCategories: `http://${getBaseUrl()}/categories/existing`,
    allGoods: `http://${getBaseUrl()}/goods`,
    goodDetails(id) {
      return `http://${getBaseUrl()}/goods/details/${id}`;
    },
    goodPhotoThumbnail(goodId, imageIndex) {
      return `http://${getBaseUrl()}/images/goods/thumbnail/pht_${goodId}_${imageIndex}.jpg`;
    },
    goodPhotoMedium(goodId, imageIndex) {
      return `http://${getBaseUrl()}/images/goods/medium/pht_${goodId}_${imageIndex}.jpg`;
    },
    defaultGoodPhoto: `http://${getBaseUrl()}/svg-images/good_default_image.svg`,
    brandLogo: `http://${getBaseUrl()}/svg-images/brand_logo.svg`,

}

function getBaseUrl() {
    return process.env.HOST + ':' + process.env.PORT;
}
