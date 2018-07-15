import config from './config';

console.log(config.baseUrl);

export default {
    existingCategories: `http://${config.baseUrl}:3000/categories/existing`,
    allGoods: `http://${config.baseUrl}:3000/goods`
}
