const SqlString = require('sqlstring');


module.exports = {
    prepearePredicate(str, arg) {
        const res = typeof arg === 'undefined' || arg === null || arg.length === 0
            ? 'TRUE' // if no such argument then resolve predicate as TRUE so it does not affect overall db query
            : `${str} ${arg}`;
        return res;
    },

    includeIfPassed(qPortion, options) {
        const arr = qPortion.split(/\w/);
        const prop = arr[arr.length - 1];

        return Object.prototype.hasOwnProperty.call(options, prop)
            ? `${qPortion} ${SqlString.escape(JSON.parse(options[prop]))}`
            : '';
    },

    clean() {
        this.query = '';
        this.options = {};
        this.prop = '';
        this.val = null;
    },

    include(query) {
        this.clean();
        this.query = query;
        return this;
    },

    ifObj(options) {
        this.options = options;
        return this;
    },

    hasProp(prop) {
        this.prop = prop;
        return this;
    },

    equalTo(val) {
        this.val = val;
        return this;
    },

    exec() {
        let resultString = '';

        if (Object.prototype.hasOwnProperty.call(this.options, this.prop)) {
            if (this.val && this.options[this.prop] !== this.val) {
                return '';
            }
            resultString = this.query.replace(/\?[a-z0-9]+\?/i, this.options[this.prop]);
        }

        this.clean();

        return resultString;
    },

};
