const express = require('express');
// const auth = require('../middlewares/auth.js');

const validateGoodsParams = require('../middlewares/validateParams/validateGoodsParams');
const db = require('../database/db.js');
const utils = require('../utils/utils');

const goodsRouter = express.Router();
// goodsRouter.use(auth);
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
    })
    .post((req, res, next) => {
        res.statusCode = 201;
        db.postItemToGoods(req.body)
            // description is in another table,
            // need to get product id before posting description
            .then(resp => db.postItemToGoodsDescription({
                textDescrip: req.body.textDescrip,
                idProduct: resp.insertId,
            }))
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });

goodsRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .put((req, res, next) => {
        res.statusCode = 200;
        db.updateGood(req.body)
            .then(resp => db.updateGoodDescription({
                textDescrip: req.body.textDescrip,
                idProduct: req.body.idProduct,
            }))
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });


module.exports = goodsRouter;
