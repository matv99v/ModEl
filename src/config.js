export default {
    prodUrl: '109.95.32.134:3000',

    devUrl: 'localhost',

    get baseUrl() {
        return process.env.NODE_ENV !== 'production'
            ? this.devUrl
            : this.prodUrl
    }



};
