export default {
    get isProduction() {
        return process.env.NODE_ENV === 'production';
    },
};
