module.exports = {
    bool(pKey, val) {
        try {
            if (typeof JSON.parse(val) !== 'boolean') {
                throw new Error();
            }
        } catch (e) {
            throw new Error(`Param type for "${pKey} = ${val}" should be a boolean`);
        }
    },

    number(pKey, val) {
        try {
            if (typeof JSON.parse(val) !== 'number') {
                throw new Error();
            }
        } catch (e) {
            throw new Error(`Param type for "${pKey} = ${val}" should be a number`);
        }
    },

    default(pKey, val) {
        throw new Error(`Param "${pKey}" is not allowed`);
    },
};
