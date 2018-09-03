const express = require('express');
const bodyParser = require('body-parser');
const categoriesRouter = express.Router();
const db = require('../database/db.js');
const mysqlQueries = require('../database/mysqlQueries.js');

categoriesRouter.use(bodyParser.json());


categoriesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        db.getQueryPromise(mysqlQueries.getAllCategories())
            .then(rows => {
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                next(err);
            });
    });


categoriesRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        if (req.params.id === 'existing') { // special :id
            db.getQueryPromise(mysqlQueries.getExistingCategories())
                .then(rows => {
                    res.end(JSON.stringify(rows));
                })
                .catch(err => {
                    next(err);
                });
        } else {
            res.end(`Will send detailes of the good: ${req.params.id}`);
        }
    });


module.exports = categoriesRouter;
