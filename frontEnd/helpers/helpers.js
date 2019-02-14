function obj2query(obj={}) {
    if (!Object.keys(obj).length) {
        return '';
    }

    const str = [];

    for (var p in obj) {
        if ( obj.hasOwnProperty(p) && isValue(obj[p]) ) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }

    return '?' + str.join('&');
}

function isValue(val) {
    return !(val === null || val === undefined || typeof val === 'string' && val.trim() === '');
}


const base = process.env.HOST + ':' + process.env.PORT;


function sortByPropName(filed) {
    return function(a, b) {
        const nameA = a[filed].toLowerCase();
        const nameB = b[filed].toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    };
}




export default {
    obj2query,
    base,
    sortByPropName
};
