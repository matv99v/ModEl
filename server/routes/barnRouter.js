const express = require('express');
const auth = require('../middlewares/auth.js');

const barnRouter = express.Router();
const db = require('../database/db.js');
const utils = require('../utils/utils');
const { replaceStringToNullInBodyObj } = require('../middlewares/reqBodyMod');
const validateBarnParams = require('../middlewares/validateParams/validateBarnParams');

barnRouter.use(validateBarnParams);

barnRouter.route('/')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;

        db.getBarn(req.query)
            .then((rows) => {
                utils.writeQueryResultsToFile('qBarn.get', req.query, rows);
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    })
    .post(auth, (req, res, next) => {
        res.statusCode = 201;

        db.postItemToBarn(req.body)
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });

barnRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .put(auth, replaceStringToNullInBodyObj, (req, res, next) => {
        res.statusCode = 200;

        db.updateItemInBarn(req.body)
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });


module.exports = barnRouter;
