const Validator = require('./Validator');

const goodsQueryValidator = new Validator({
    catId: ['not_empty', 'positive_integer'],
    enabled: ['not_empty', 'jsonBoolean'],
    excludeId: ['not_empty', 'integer'],
    goodId: ['not_empty', 'positive_integer'],
});

const goodsBodyValidator = new Validator({
    textDescrip: ['not_empty', 'string'],
    idCategory: ['not_empty', 'positive_integer'],
    declarePrice: ['not_empty', 'decimal'],
    detailName: ['string'],
    exist: ['not_empty', 'integer', { number_between: [0, 1] }],
    idProduct: ['not_empty', 'positive_integer'],
    productName: ['not_empty', 'string'],
    productParams: ['not_empty', 'string'],
});

function validateParams(req, res, next) {
    if (!goodsQueryValidator.validate(req.query)) {
        throw new Error(JSON.stringify(goodsQueryValidator.getErrors()));
    }
    if (!goodsBodyValidator.validate(req.body)) {
        throw new Error(JSON.stringify(goodsBodyValidator.getErrors()));
    }
    next();
}

module.exports = validateParams;
