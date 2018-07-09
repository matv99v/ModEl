const express = require('express');
const bodyParser = require('body-parser');
const goodsCategoriesRouter = express.Router();
const db = require('../database/db.js');

goodsCategoriesRouter.use(bodyParser.json());


goodsCategoriesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {

        db.getAllGoodsCategories()
            .then(rows => {
                console.log(JSON.stringify(rows));
                res.end(JSON.stringify(rows));
            })
            .catch(err => {
                console.log('eeeeee');
                next(err);
            });

    })
    .post((req, res, next) => {
        res.end(`Will add the good: ${req.body.name}, with details: ${req.body.description}`);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /goodsCategories');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the goodsCategories');
    });

goodsCategoriesRouter.route('/:id')
    .get((req, res, next) => {
        res.end(`Will send detailes of the good: ${req.params.id}`);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /goodsCategories/${req.params.id}`);
    })
    .put((req, res, next) => {
        res.end(`Updating the good: ${req.params.id}, will update the good: ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleting the good: ${req.params.id}`);
    });


module.exports = goodsCategoriesRouter;
