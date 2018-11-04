const Validator = require('./Validator');

const barnValidator = new Validator(
    {
        hash: ['not_empty', 'twoNumbersHash'],
        excludeFields: ['not_empty', 'jsonArray'],
        zakNum: ['not_empty', 'positive_integer'],
        idProd: ['not_empty', 'positive_integer'],
        queryAddition: ['not_empty', 'string', { one_of: ['all', 'actual', 'pendingshp', 'intransit'] }],
    },
    ['jsonArray', 'twoNumbersHash'],
);


function validateParams(req, res, next) {
    barnValidator.validate(req.query);
    next();
}

module.exports = validateParams;
