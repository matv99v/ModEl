import Bluebird from 'bluebird';


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

export default {
    get
}
