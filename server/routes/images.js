const express = require('express');
const bodyParser = require('body-parser');
const imagesRouter = express.Router();
const sharp = require('sharp');

imagesRouter.use(bodyParser.json());


imagesRouter.route('/goods/thumbnail/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        next();
    })
    .get((req, res, next) => {
        sharp(`./public/goods-photos/${req.params.id}`)
            .resize(150)
            .toBuffer()
            .then(data => res.send(data))
            .catch(err => next(err));
    });

imagesRouter.route('/goods/medium/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        next();
    })
    .get((req, res, next) => {
        sharp(`./public/goods-photos/${req.params.id}`)
            .resize(500)
            .toBuffer()
            .then(data => res.send(data))
            .catch(err => next(err));
    });


module.exports = imagesRouter;
