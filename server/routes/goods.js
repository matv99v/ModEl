const express = require('express');
const bodyParser = require('body-parser');
const goodsRouter = express.Router();
goodsRouter.use(bodyParser.json());




goodsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {

        // remove this test data later!
        const fs = require('fs');
        const testData = fs.readFileSync('./test-data.json', 'utf8');

        res.end(testData);
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
