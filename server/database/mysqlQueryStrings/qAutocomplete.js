const utils = require('../../utils/utils');
const dbHelpers = require('../../utils/dbHelpers');


function get(options) {
    const resString = `
        SELECT *
            FROM ${options.table}
            WHERE ${options.field} LIKE '%${options.like}%'
            ${dbHelpers.include('AND exist = 1').ifObj(options).hasProp('enabled').equalTo('true').exec()}

    `;

    utils.wrtieQueryExample('qAutocomplete.get', options, resString);
    return resString;
}

module.exports = {
    get,
};
