const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = express.Router();
const db = require('../database/db.js');
const mysqlQueries = require('../database/mysqlQueries.js');

apiRouter.use(bodyParser.json());


apiRouter.route('/categories')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        db.getCategories(req.query)
            .then(rows => {
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                next(err);
            });
    });




apiRouter.route('/goods')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        db.getGoods(req.query)
            .then(rows => {
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                next(err);
            });
    });


module.exports = apiRouter;
