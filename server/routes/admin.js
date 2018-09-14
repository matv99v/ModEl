const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = express.Router();
const db = require('../database/db');
const mysqlQueries = require('../database/mysqlQueries.js');
const path = require('path');
adminRouter.use(bodyParser.json());



adminRouter.route('/')
    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     next();
    // })
    .get((req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../public', 'admin-index.html'));
    });

adminRouter.route('/goods')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {

        // db.getQueryPromise(mysqlQueries.getAllGoods())
        //     .then(rows => {
        //         res.end(JSON.stringify(rows));
        //     })
        //     .catch(err => {
        //         next(err);
        //     });



        res.send();
    });



module.exports = adminRouter;
