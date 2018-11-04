const LIVR = require('livr');
const customRules = require('./customRules');

LIVR.Validator.defaultAutoTrim(true);


class Validator {
    constructor(rulesObj, customs = []) {
        this.validator = new LIVR.Validator(rulesObj);
        customs.forEach((rule) => {
            this.validator.registerRules({
                [rule]() {
                    return customRules[rule];
                },
            });
        });
    }

    validate(data) {
        const validData = this.validator.validate(data);

        if (!validData) {
            throw new Error(JSON.stringify(this.validator.getErrors()));
        }
    }
}


module.exports = Validator;
