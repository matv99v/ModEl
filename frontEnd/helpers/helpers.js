function obj2query(obj={}) {
    if (!Object.keys(obj).length) {
        return '';
    }

    const str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }

    return '?' + str.join('&');
}

const base = process.env.HOST + ':' + process.env.PORT;


export default {
    obj2query,
    base
};
