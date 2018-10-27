const utils = require('../../utils/utils');


function get(options) {
    const resString = `
        SELECT * FROM userlist
            WHERE usrLogin = '${options.username}'
    `;

    utils.wrtieQueryExample('qUserhash.get', options, resString);
    return resString;
}

module.exports = {
    get,
};
