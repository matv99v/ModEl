import moment from 'moment';


export function exist(val) {
    return !!val;
}

export function isNumericInt(val) {
    return exist(val) && !!val.toString().match(/^\d+$/);
}

export function isAliexpressUrl(val) {
    return !!val.match(/^https:\/\/.*aliexpress.*\?(order_id=|orderId=)\d+$/);
}

export function getUrlOrderId(val) {
    const result = val.match(/\d+(?=$)/);
    return result && result[0];
}

export function isEqualStrings(valA, valB) {
    return valA.toString() === valB.toString();
}

export function isReal2d4(val) {
    return val.toString().match(/^\d{1,2}?(.\d{1,4})?$/);
}

export function isBetween0And100(val) {
    return val > 0 && val < 100;
}

export function isDateInFuture(val, format = 'YYYY-MM-DD') {
    return moment(val, format).isSameOrAfter(moment());
}

export function isSameOrAfter(valA, valB, format = 'YYYY-MM-DD') {
    return moment(valA, format).isSameOrAfter(moment(valB, format));
}
