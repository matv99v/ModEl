const utils = require('../../utils/utils');


function get(options) {
    const resString = `
        SELECT *
            FROM ${options.table}
            WHERE ${options.field} LIKE '%${options.like}%'
    `;

    utils.wrtieQueryExample('qAutocomplete.get', options, resString);
    return resString;
}

module.exports = {
    get,
};
