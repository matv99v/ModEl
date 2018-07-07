const express = require('express');
const bodyParser = require('body-parser');
const goodsCategoriesRouter = express.Router();
goodsCategoriesRouter.use(bodyParser.json());


goodsCategoriesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the goodsCategories to you!');
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
