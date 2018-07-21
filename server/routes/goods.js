const express = require('express');
const bodyParser = require('body-parser');
const goodsRouter = express.Router();
const db = require('../database/db');
const utils = require('../utils/utils');

goodsRouter.use(bodyParser.json());




goodsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        db.getAllGoods()
            .then(rows => { // TODO: chain promises

                const existingGoodsIds = rows.reduce((acc, row) => [...acc, row.idProduct], []);

                utils.getAmountOfPhotos(existingGoodsIds)
                    .then(photosAmount => {
                        const results = rows.map(row => {
                            return {
                                ...row,
                                photosAmount: photosAmount[row.idProduct]
                            };
                        });
                        res.end(JSON.stringify(results));
                    });

            });

    })

goodsRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end(`Will send detailes of the good: ${req.params.id}`);
    });

goodsRouter.route('/details/:id')
    .get((req, res, next) => {

        db.getGoodDetailsById(req.params.id)
          .then(rows => {
            res.end(JSON.stringify(rows));
          });

    });


module.exports = goodsRouter;
