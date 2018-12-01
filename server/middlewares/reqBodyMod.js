function replaceStringsToNull(obj) {
    const resultObj = { ...obj };

    Object.keys(resultObj).forEach((key) => {
        const val = resultObj[key];
        if (typeof val === 'string' && val.length === 0) {
            resultObj[key] = null;
        }
    });

    return resultObj;
}


module.exports = {
    replaceStringToNullInBodyObj(req, res, next) {
        req.body = replaceStringsToNull(req.body);
        next();
    },
};
