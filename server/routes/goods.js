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
        res.setHeader('Access-Control-Allow-Origin', '*');
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
    .post((req, res, next) => {
        res.end(`Will add the good: ${req.body.name}, with details: ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /goods');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the goods');
    });

goodsRouter.route('/:id')
    .get((req, res, next) => {
        res.end(`Will send detailes of the good: ${req.params.id}`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /goods/${req.params.id}`);
    })
    .put((req, res, next) => {
        res.end(`Updating the good: ${req.params.id}, will update the good: ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleting the good: ${req.params.id}`);
    });


module.exports = goodsRouter;
