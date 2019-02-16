const express = require('express');
// const validateCategoriesParams = require('../middlewares/validateParams/validateCategoriesParams');

const categoriesRouter = express.Router();
// categoriesRouter.use(validateCategoriesParams);

const db = require('../database/db.js');
const utils = require('../utils/utils');


categoriesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        db.getCategories(req.query)
            .then((rows) => {
                utils.writeQueryResultsToFile('qCategories.get', req.query, rows);
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    });


module.exports = categoriesRouter;
