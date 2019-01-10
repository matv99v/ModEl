module.exports = {
    pickExistingQuoted(obj, quotes) {
        const fields = Object.keys(obj)
            .filter(field => !(obj[field] === undefined || obj[field] === null || obj[field] === ''));

        const values = fields.map(key => (quotes.includes(key)
            ? `'${obj[key]}'`
            : obj[key]));

        return {
            fields,
            values,
        };
    },

    prepareConditions(arr) {
        return arr
            .filter(el => el.trim().length)
            .reduce((acc, el, i) => {
                return i ? `${acc} AND ${el}` : `WHERE ${el}`;
            }, '');
    },

    validateOptions(options, allowedProps) {
        const predicate = !Object.keys(options).some(key => !allowedProps.includes(key));

        if (!predicate) {
            throw new Error(`Some of the passed props are not allowed: ${JSON.stringify(options)}`);
        }
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

    always() {
        const resultString = this.query;
        this.clean();
        return resultString;
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
