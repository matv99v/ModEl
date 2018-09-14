import Bluebird from 'bluebird';
import urls from './urls';

function get(url) {
    return new Bluebird((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                reject(new Error(this.responseText) || new Error('something went wrong'));
                return;
            }

            resolve(JSON.parse(this.responseText));
        };
    });
}

function getCategories(obj) {
    return get(urls.categories(obj));
}

function getGoods(obj) {
    return get(urls.goods(obj));
}

export default {
    get,
    getCategories,
    getGoods
};
