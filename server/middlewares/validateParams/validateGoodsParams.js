const Validator = require('./Validator');

const goodsValidator = new Validator(
    {
        catId: ['not_empty', 'positive_integer'],
        enabled: ['not_empty', 'jsonBoolean'],
        excludeId: ['not_empty', 'integer'],
        goodId: ['not_empty', 'positive_integer'],
    },
    ['jsonBoolean', 'nullVal'],
);

function validateParams(req, res, next) {
    goodsValidator.validate(req.query);
    next();
}

module.exports = validateParams;
