const Validator = require('./Validator');

const autocompleteValidator = new Validator({
    table: ['required', 'string'],
    field: ['required', 'string'],
    like: ['required', 'string'],
});

function validateParams(req, res, next) {
    autocompleteValidator.validate(req.query);
    next();
}

module.exports = validateParams;
