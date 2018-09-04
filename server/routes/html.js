const express = require('express');
const bodyParser = require('body-parser');
const html = express.Router();
const utils = require('../utils/utils');

html.use(bodyParser.json());

// proxy request on some details
// this is a temporary, need to pass this info to DB

html.route('/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        next();
    })
    .get((req, res, next) => {
        utils.request(`http://zvelectronics.sytes.net/testMySQL/html/${req.params.id}`)
          .then(data => {
            res.send(data);
          })
          .catch(err => next(err));
    });



module.exports = html;
