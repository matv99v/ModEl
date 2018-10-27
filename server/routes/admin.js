const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('../auth/auth.js');

const adminRouter = express.Router();
adminRouter.use(bodyParser.json());
// const db = require('../database/db');
// const mysqlQueries = require('../database/mysqlQueries.js');


adminRouter.route('/')
    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     next();
    // })
    .get(auth, (req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../public/bundle', 'admin-index.html'));
    });


module.exports = adminRouter;
