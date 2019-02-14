const express = require('express');
const validateAutocompleteParams = require('../middlewares/validateParams/validateAutocompleteParams');

const autocompleteRoute = express.Router();
autocompleteRoute.use(validateAutocompleteParams);

const db = require('../database/db.js');
const utils = require('../utils/utils');


autocompleteRoute.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        db.getAutocomplete(req.query)
            .then((rows) => {
                utils.writeQueryResultsToFile('qAutocomplete.get', req.query, rows);
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    });

module.exports = autocompleteRoute;
