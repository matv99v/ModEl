const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

const db = require('../database/db.js');
const utils = require('../utils/utils');


apiRouter.route('/categories')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        db.getCategories(req.query)
            .then((rows) => {
                utils.writeQueryResultsToFile('qCategories.get', req.query, rows);
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    });


apiRouter.route('/goods')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        let sharedRows;

        db.getGoods(req.query)
            .then((rows) => {
                sharedRows = rows;
                const existingGoodsIds = rows.reduce((acc, row) => [...acc, row.idProduct], []);
                return utils.getAmountOfPhotos(existingGoodsIds);
            })
            .then((photosAmount) => {
                const results = sharedRows.map(row => ({
                    ...row,
                    photosAmount: photosAmount[row.idProduct],
                }));
                res.end(JSON.stringify(results));
            })
            .catch((err) => {
                next(err);
            });
    });

apiRouter.route('/barn')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;

        db.getBarn(req.query)
            .then((rows) => {
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        res.statusCode = 201;

        db.postItemToBarn(req.body)
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });

apiRouter.route('/barn/:id')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    // .get((req, res, next) => {
    //     const ids = req.params.id.split('-');
    //
    //     const queryObj = {
    //         zakNumber: +ids[0],
    //         idProduct: +ids[1],
    //     };
    //
    //     // TODO: match goodId and idCategory
    //
    //     db.getBarnTransactionById(queryObj)
    //         .then((rows) => {
    //             res.end(JSON.stringify(rows));
    //         })
    //         .catch((err) => {
    //             next(err);
    //         });
    // })
    .put((req, res, next) => {
        res.statusCode = 200;

        db.updateItemInBarn(req.body)
            .then((resp) => {
                res.end(JSON.stringify(resp));
            })
            .catch((err) => {
                next(err);
            });
    });

apiRouter.route('/autocomplete') // TODO: move to good query
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        db.getAutocomplete(req.query)
            .then((rows) => {
                res.end(JSON.stringify(rows));
            })
            .catch((err) => {
                next(err);
            });
    });


// apiRouter.route('/goods/autocomplete') // TODO: move to good query
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         next();
//     })
//     .get((req, res, next) => {
//         db.getGoodsViaAutocomplete(req.query)
//             .then(rows => {
//                 res.end(JSON.stringify(rows));
//             })
//             .catch(err => {
//                 next(err);
//             });
//     });
//
// apiRouter.route('/categories/autocomplete') // TODO: move to good query
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         next();
//     })
//     .get((req, res, next) => {
//         db.getCategoriesViaAutocomplete(req.query)
//             .then(rows => {
//                 res.end(JSON.stringify(rows));
//             })
//             .catch(err => {
//                 next(err);
//             });
//     });


module.exports = apiRouter;
