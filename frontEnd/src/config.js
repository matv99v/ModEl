// import utils from 'AliasSrc/utils';

export default {
    get baseUrl() {
        return this.env2url[process.env.NODE_ENV];
    },

    env2url: {
        production: '109.95.32.134:3000',
        development: 'localhost:3001',
        test: '109.95.32.134:3001'
    }

};
