import utils from 'AliasSrc/utils';

export default {
    prodUrl: '109.95.32.134:3000',

    devUrl: 'localhost:3000',

    get baseUrl() {
        return utils.isProduction ? this.prodUrl : this.devUrl;
    }



};
