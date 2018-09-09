import utils from 'AliasSrc/utils';

export default {
    prodUrl: '109.95.32.134',
    devUrl: 'localhost',
    prodPort: '3000',
    devPort: '3001',

    get baseUrl() {
        return utils.isProduction
            ? this.prodUrl + ':' + this.prodPort
            : this.devUrl + ':' + this.devPort;
    }

};
