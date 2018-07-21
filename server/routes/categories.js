const express = require('express');
const bodyParser = require('body-parser');
const categoriesRouter = express.Router();
const db = require('../database/db.js');

categoriesRouter.use(bodyParser.json());


categoriesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        db.getAllCategories()
            .then(rows => {
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
        res.end('PUT operation is not supported on /Categories');
    })
    .delete((req, res, next) => {
        res.end('Deleting all the Categories');
    });


categoriesRouter.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        if (req.params.id === 'existing') { // special :id
            db.getExistingCategories()
                .then(rows => {
                    res.end(JSON.stringify(rows));
                })
                .catch(err => {
                    next(err);
                });
        } else {
            res.end(`Will send detailes of the good: ${req.params.id}`);
        }

    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /Categories/${req.params.id}`);
    })
    .put((req, res, next) => {
        res.end(`Updating the good: ${req.params.id}, will update the good: ${req.body.name} with details: ${req.body.description}`);
    })
    .delete((req, res, next) => {
        res.end(`Deleting the good: ${req.params.id}`);
    });


module.exports = categoriesRouter;
