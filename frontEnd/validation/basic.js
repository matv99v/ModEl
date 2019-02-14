import moment from 'moment';


export function exist(val) {
    return !(typeof val === 'undefined' || val === null || val.length === 0);
}

export function isZero(val) {
    return +val === 0;
}

export function isNumericInt(val) {
    return exist(val) && !!val.toString().match(/^\d+$/);
}

export function isValidUrl(val) {
    return !!val.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
}

export function isNumber(val) {
    return typeof val === 'number';
}

export function containNumber(str, num) {
    const re = new RegExp(`\\D${num}(\\D|$)`);
    return exist(str) && exist(num) && isNumber(+num) && re.test(str);
}

export function isEqualStrings(valA, valB) {
    return exist(valA) && exist(valB) && valA.toString() === valB.toString();
}

export function isReal6d4(val) {
    return val.toString().match(/^\d{1,2}?(.\d{1,4})?$/);
}

export function isReal8d2(val) {
    return val.toString().match(/^\d{1,6}?(.\d{1,2})?$/);
}

export function isBetween0And100(val) {
    return val > 0 && val < 100;
}

export function isSameDay(valA, valB, format = 'YYYY-MM-DD') {
    return moment(valA, format).isSame(moment(valB, format), 'day');
}

export function isIncOrderDays(valA, valB, allowSame = false, format = 'YYYY-MM-DD') {
    return allowSame
        ? moment(valA, format).isSameOrBefore(moment(valB, format), 'day')
        : moment(valA, format).isBefore(moment(valB, format), 'day');
}

export function isPresentDay(valA, format = 'YYYY-MM-DD') {
    return moment(valA, format).isSame(moment(), 'day');
}

export function isFutureDay(valA, format = 'YYYY-MM-DD') {
    return moment(valA, format).isAfter(moment(), 'day');
}

export function isPastDay(valA, format = 'YYYY-MM-DD') {
    return moment(valA, format).isBefore(moment(), 'day');
}
