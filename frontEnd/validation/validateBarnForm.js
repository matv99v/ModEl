import {
    exist,
    isNumericInt,
    isEqualStrings,
    isReal6d4,
    isReal8d2,
    isBetween0And100,
    isZero,
    isIncOrderDays,
    isFutureDay,
    isPastDay,
    isValidUrl,
    containNumber
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
        if (!exist(zakNumber) && exist(val)) {
            return 'zakLink не может быть без zakNumber';
        }

        if (exist(zakNumber) && !exist(val)) {
            return 'ожидается zakLink';
        }
        if (exist(val) && !isValidUrl(val)) {
            return 'проверьте формат ссылки';
        }
        if (exist(val) && exist(zakNumber) && !containNumber(val, zakNumber)) {
            return 'zakNumber должен быть частью zakLink';
        }
    },

    zakQnty(val) {
        if (!exist(val) || isZero(val)) {
            return 'ожидается zakQnty';
        }
        if (!isNumericInt(val)) {
            return 'ожидается комбинация цифр';
        }
    },

    frozQnty(val) {
        if (exist(val) && !isNumericInt(val)) {
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
        if (!isReal8d2(val)) {
            return 'ожидается положительное число в формате dddddd.dd';
        }
    },

    curRate(val) {
        if (!exist(val)) {
            return 'ожидается curRate';
        }
        if (!isReal6d4(val)) {
            return 'ожидается положительное число в формате dd.dddd';
        }
        if (!isBetween0And100(val)) {
            return 'ожидается curRate в диапазоне от 1 до 99.9999 включительно';
        }
    },

    zakDate(zakDate) {
        if (!exist(zakDate)) {
            return 'ожидается zakDate';
        }
        if (isFutureDay(zakDate)) {
            return 'zakDate не может быть в будущем';
        }
    },

    zakDateShp(zakDateShp, zakDate) {
        if (exist(zakDateShp) && !exist(zakDate)) {
            return 'zakDateShp не может быть без zakDate';
        }
        if (exist(zakDateShp) && isFutureDay(zakDateShp)) {
            return 'zakDateShp не может быть в будущем';
        }
        if (exist(zakDateShp) && exist(zakDate) && isIncOrderDays(zakDateShp, zakDate)) {
            return 'zakDateShp не может быть раньше zakDate';
        }
    },

    zakDateRcv(zakDateRcv, zakDateShp) {
        if (exist(zakDateRcv) && !exist(zakDateShp)) {
            return 'zakDateRcv не может быть без zakDateShp';
        }
        if (exist(zakDateRcv) && isFutureDay(zakDateRcv)) {
            return 'zakDateRcv не может быть в будущем';
        }
        if (exist(zakDateRcv) && exist(zakDateShp) && isIncOrderDays(zakDateRcv, zakDateShp)) {
            return 'zakDateRcv не может быть раньше zakDateShp';
        }
    },

    zakDateProtct(zakDateProtct, zakDateShp) {
        if (exist(zakDateProtct) && !exist(zakDateShp)) {
            return 'zakDateProtct не может быть без zakDateShp';
        }
        if (exist(zakDateProtct) && isPastDay(zakDateProtct)) {
            return 'zakDateProtct не может быть в прошлом';
        }
    },




};
