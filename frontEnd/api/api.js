import Bluebird from 'bluebird';
import urls from './urls';

function get(url) {
    return new Bluebird((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                reject(new Error(this.responseText) || new Error('something went wrong'));
                return;
            }

            resolve(JSON.parse(this.responseText));
        };
        xhr.send(null);
    });
}

function post(url, data) {
    return new Bluebird((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 201) {
                reject(new Error(this.responseText) || new Error('something went wrong'));
                return;
            }

            resolve(JSON.parse(this.responseText));
        };

        xhr.send(JSON.stringify(data));
    });
}

function put(url, data) {
    return new Bluebird((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                reject(new Error(this.responseText) || new Error('something went wrong'));
                return;
            }

            resolve(JSON.parse(this.responseText));
        };
        xhr.send(JSON.stringify(data));

    });
}

//     // Delete a user
//     var url = 'http://localhost:8080/api/v1/users';
//     var xhr = new XMLHttpRequest();
//     xhr.open('DELETE', url+'/12', true);
//     xhr.onload = function () {
//         var users = JSON.parse(xhr.responseText);
//         if (xhr.readyState == 4 && xhr.status == '200') {
//             console.table(users);
//         } else {
//             console.error(users);
//         }
//     };
//     xhr.send(null);
// }

// categories
function getCategories(obj) {
    return get(urls.categories(obj));
}

// goods
function getGoods(obj) {
    return get(urls.goods(obj));
}
function postToGoods(obj) {
    return post(urls.goods(), obj);
}

// barn
function getBarn(obj) {
    return get(urls.barn(obj));
}
function postToBarn(obj) {
    return post(urls.barn(), obj);
}
function updateBarn(hash, obj) {
    return put(urls.putBarn(hash), obj);
}

// misc
function autocomplete(obj) {
    return get(urls.autocomplete(obj));
}


export default {
    getCategories,
    getGoods,
    getBarn,
    postToBarn,
    autocomplete,
    updateBarn,
    postToGoods
};
