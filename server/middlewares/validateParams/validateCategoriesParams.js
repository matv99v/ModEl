const Validator = require('./Validator');

const categoriesValidator = new Validator({
    enabled: ['not_empty', 'jsonBoolean'],
    excludeProductsCount: ['not_empty', 'integer'],
});

function validateParams(req, res, next) {
    if (!categoriesValidator.validate(req.query)) {
        throw new Error(JSON.stringify(categoriesValidator.getErrors()));
    }
    next();
}

module.exports = validateParams;
