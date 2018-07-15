import utils from './config';


export default {
    get isProduction() {
        return process.env.NODE_ENV === 'production';
    }
}
