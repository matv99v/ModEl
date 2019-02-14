/* eslint func-names: 0 */
/* eslint consistent-return: 0 */

const LIVR = require('livr');


function jsonBoolean() {
    return function (value) {
        // We already have "required" rule to check that the value is present
        if (value === undefined || value === null || value === '') return;
        let err = false;
        try {
            const parsedVal = JSON.parse(value);
            if (typeof parsedVal !== typeof true) {
                throw new Error();
            }
        } catch (e) {
            err = true;
        }
        if (err) {
            return `"${value}" should be of JSON Boolean type`;
        }
    };
}

function jsonArray() {
    return function (value) {
        // We already have "required" rule to check that the value is present
        if (value === undefined || value === null || value === '') return;
        let err = false;
        try {
            const arr = value.split(',');
            if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
                throw new Error();
            }
        } catch (e) {
            err = true;
        }
        if (err) {
            return `Should be a list of numbers, instead got ${value}`;
        }
    };
}

function twoNumbersHash() {
    return function (value) {
        // We already have "required" rule to check that the value is present
        if (value === undefined || value === null || value === '') return;
        const isValid = /^\d+-\d+$/.test(value);
        if (!isValid) {
            return `Hash should consist of two numbers devided with a minus sign, but got ${value}`;
        }
    };
}

LIVR.Validator.registerDefaultRules({
    jsonBoolean,
    jsonArray,
    twoNumbersHash,
});

module.exports = LIVR.Validator;
