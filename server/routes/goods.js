const express = require('express');
const bodyParser = require('body-parser');
const goodsRouter = express.Router();
const db = require('../database/db.js');

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
            .then(rows => { // TODO: get send photos to response
                const productIds = rows.reduce((row, acc) => {
                    console.log(row.idproduct);
                }, []);

                // console.log(rows[0].idproduct);

                res.end(JSON.stringify(rows));
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
