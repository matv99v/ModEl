const Validator = require('./Validator');

const autocompleteValidator = new Validator({
    table: ['required', 'string'],
    field: ['required', 'string'],
    like: ['required', 'string'],
});

function validateParams(req, res, next) {
    if (!autocompleteValidator.validate(req.query)) {
        throw new Error(JSON.stringify(autocompleteValidator.getErrors()));
    }
    next();
}

module.exports = validateParams;
