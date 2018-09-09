const express = require('express');
const bodyParser = require('body-parser');
const goodsRouter = express.Router();
const db = require('../database/db');
const mysqlQueries = require('../database/mysqlQueries.js');
const utils = require('../utils/utils');

goodsRouter.use(bodyParser.json());




goodsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        let sharedRows;

        const query = req.query.catId // TODO: refactor
            ? mysqlQueries.getGoodsByCategoryId(req.query.catId, req.query.excludegoodid)
            : mysqlQueries.getGoodById(req.query.goodId);

        db.getQueryPromise(query)
            .then(rows => {
                sharedRows = rows;
                const existingGoodsIds = rows.reduce((acc, row) => [...acc, row.idProduct], []);
                return utils.getAmountOfPhotos(existingGoodsIds)
            })
            .then(photosAmount => {
                const results = sharedRows.map(row => {
                    return {
                        ...row,
                        photosAmount: photosAmount[row.idProduct]
                    };
                });
                res.end(JSON.stringify(results));
            })
            .catch(err => {
                next(err);
            });
    });

goodsRouter.route('/details/:id')
    .get((req, res, next) => {
        db.getQueryPromise(mysqlQueries.getGoodDetailsById(req.params.id))
            .then(rows => {
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                next(err);
            });
    });

goodsRouter.route('/:id')
    .get((req, res, next) => {
        db.getQueryPromise(mysqlQueries.getGoodsByCategoryId(req.params.id))
            .then(rows => {
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                next(err);
            });
    });


module.exports = goodsRouter;
