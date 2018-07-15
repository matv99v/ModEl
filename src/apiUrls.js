import config from './config';

console.log(config.baseUrl);

export default {
    existingCategories: `http://${config.baseUrl}/categories/existing`,
    allGoods: `http://${config.baseUrl}/goods`
}
