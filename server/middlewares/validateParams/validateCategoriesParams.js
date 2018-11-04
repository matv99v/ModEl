const Validator = require('./Validator');

const categoriesValidator = new Validator(
    {
        enabled: ['not_empty', 'jsonBoolean'],
        excludeProductsCount: ['not_empty', 'integer'],
    },
    ['jsonBoolean'],
);

function validateParams(req, res, next) {
    categoriesValidator.validate(req.query);
    next();
}

module.exports = validateParams;
