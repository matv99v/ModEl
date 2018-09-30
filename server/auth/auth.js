const db = require('../database/db.js');
var crypto = require('crypto')
var basicAuth = require('basic-auth');

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
};

async function auth (req, res, next) {
    const currUser = basicAuth(req);

    if (!currUser || !currUser.name || !currUser.pass) {
        return unauthorized(res);
    };

    const savedUserRowData = await db.getUserHash({username: currUser.name});
    const savedUserStr = JSON.stringify(savedUserRowData);
    const savedUser = JSON.parse(savedUserStr)[0];
    const currUserHash = sha1(currUser.pass);

    if (savedUser && savedUser.usrLogin === currUser.name && savedUser.passUsr === currUserHash) {
        return next();
    } else {
        return unauthorized(res);
    };

};


module.exports = auth;
