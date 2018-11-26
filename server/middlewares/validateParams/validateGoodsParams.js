const Validator = require('./Validator');

const goodsValidator = new Validator({
    catId: ['not_empty', 'positive_integer'],
    enabled: ['not_empty', 'jsonBoolean'],
    excludeId: ['not_empty', 'integer'],
    goodId: ['not_empty', 'positive_integer'],
});

function validateParams(req, res, next) {
    if (!goodsValidator.validate(req.query)) {
        throw new Error(JSON.stringify(goodsValidator.getErrors()));
    }
    next();
}

module.exports = validateParams;
