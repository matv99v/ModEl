const express = require('express');

const validateGoodsParams = require('../middlewares/validateParams/validateGoodsParams');
const db = require('../database/db.js');
const utils = require('../utils/utils');

const goodsRouter = express.Router();
goodsRouter.use(validateGoodsParams);


goodsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        let sharedRows;

        db.getGoods(req.query)
            .then((rows) => {
                sharedRows = rows;
                const existingGoodsIds = rows.reduce((acc, row) => [...acc, row.idProduct], []);
                return utils.getAmountOfPhotos(existingGoodsIds);
            })
            .then((photosAmount) => {
                const results = sharedRows.map(row => ({
                    ...row,
                    photosAmount: photosAmount[row.idProduct],
                }));
                utils.writeQueryResultsToFile('qGoods.get', req.query, sharedRows);
                res.end(JSON.stringify(results));
            })
            .catch((err) => {
                next(err);
            });
    });

module.exports = goodsRouter;
