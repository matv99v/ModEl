const Validator = require('./Validator');

const goodsQueryValidator = new Validator({
    catId: ['not_empty', 'positive_integer'],
    enabled: ['not_empty', 'jsonBoolean'],
    excludeId: ['not_empty', 'integer'],
    goodId: ['not_empty', 'positive_integer'],
});

// TODO: implement
const goodsBodyValidator = new Validator({
    textDescrip: ['not_empty'],
    idCategory: ['not_empty'],
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
