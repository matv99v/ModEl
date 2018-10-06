import {
    exist,
    isNumericInt,
    isAliexpressUrl,
    getUrlOrderId,
    isEqualStrings,
    isReal2d4,
    isBetween0And100,
    isDateInFuture,
    isSameOrAfter,
} from './basic.js';

export default {
    idProduct(val) {
        if (!exist(val)) {
            return 'ожидается idProduct';
        }
    },

    zakNumber(val) {
        if (!exist(val)) {
            return 'ожидается zakNumber';
        }
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    zakLink(val, zakNumber) {
        if (exist(zakNumber) && !exist(val)) {
            return 'ожидается zakLink';
        }
        if (exist(val) && !isAliexpressUrl(val)) {
            return 'проверьте формат ссылки';
        }
        if (exist(val) && !isEqualStrings(getUrlOrderId(val), zakNumber)) {
            return 'zakNumber и zakLink не соответсвовуют';
        }
    },

    zakQnty(val) {
        if (!exist(val)) {
            return 'ожидается zakQnty';
        }
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    frozQnty(val) {
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    restQnty(val) {
        if (!exist(val)) {
            return 'ожидается restQnty';
        }
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    zakSum(val) {
        if (!exist(val)) {
            return 'ожидается zakSum';
        }
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    curRate(val) {
        if (!exist(val)) {
            return 'ожидается curRate';
        }
        if (!isReal2d4(val)) {
            return 'ожидается число в формате dd.dddd';
        }
        if (!isBetween0And100(val)) {
            return 'ожидается в диапазоне от 1 до 99.9999 включительно';
        }
    },

    zakDate(zakDate) {
        if (!exist(zakDate)) {
            return 'ожидается zakDate';
        }
        if (isDateInFuture(zakDate)) {
            return 'zakDate не может быть в будущем';
        }
    },

    zakDateShp(zakDateShp, zakDate) {
        if (exist(zakDateShp) && isDateInFuture(zakDateShp)) {
            return 'zakDateShp не может быть в будущем';
        }
        if (exist(zakDateShp) && exist(zakDate) && !isSameOrAfter(zakDateShp, zakDate)) {
            return 'zakDateShp не может быть раньше zakDate';
        }
        if (exist(zakDateShp) && !exist(zakDate)) {
            return 'zakDateShp не может быть без zakDate';
        }
    },

    zakDateRcv(zakDateRcv, zakDateShp) {
        if (exist(zakDateRcv) && isDateInFuture(zakDateRcv)) {
            return 'zakDateRcv не может быть в будущем';
        }
        if (exist(zakDateRcv) && exist(zakDateShp) && !isSameOrAfter(zakDateRcv, zakDateShp)) {
            return 'zakDateRcv не может быть раньше zakDateShp';
        }
        if (exist(zakDateRcv) && !exist(zakDateShp)) {
            return 'zakDateRcv не может быть без zakDateShp';
        }
    },

    zakDateProtct(zakDateProtct, zakDateRcv) {
        if (exist(zakDateProtct) && isDateInFuture(zakDateProtct)) {
            return 'zakDateProtct не может быть в будущем';
        }
        if (exist(zakDateProtct) && exist(zakDateRcv) && !isSameOrAfter(zakDateProtct, zakDateRcv)) {
            return 'zakDateProtct не может быть раньше zakDateRcv';
        }
        if (exist(zakDateProtct) && !exist(zakDateRcv)) {
            return 'zakDateProtct не может быть без zakDateRcv';
        }

    },




};
