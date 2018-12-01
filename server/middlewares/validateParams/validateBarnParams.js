const Validator = require('./Validator');

const barnQueryValidator = new Validator({
    hash: ['not_empty', 'twoNumbersHash'],
    excludeFields: ['not_empty', 'jsonArray'],
    zakNum: ['not_empty', 'positive_integer'],
    idProd: ['not_empty', 'positive_integer'],
    queryAddition: ['not_empty', 'string', { one_of: ['all', 'actual', 'pendingshp', 'intransit'] }],
});

const barnBodyValidator = new Validator({
    curRate: ['positive_decimal', { max_number: 100 }],
    frozQnty: ['positive_integer'],
    idProduct: ['positive_integer'],
    restQnty: ['positive_integer'],
    zakDate: ['iso_date'],
    zakDateProtct: ['iso_date'],
    zakDateRcv: ['iso_date'],
    zakDateShp: ['iso_date'],
    zakLink: ['url'],
    zakNumber: ['positive_integer'],
    zakQnty: ['positive_integer'],
    zakSum: ['positive_decimal'],
});


function validateParams(req, res, next) {
    if (!barnQueryValidator.validate(req.query)) {
        throw new Error(JSON.stringify(barnQueryValidator.getErrors()));
    }
    if (!barnBodyValidator.validate(req.body)) {
        throw new Error(JSON.stringify(barnBodyValidator.getErrors()));
    }
    next();
}

module.exports = validateParams;
