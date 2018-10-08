const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.HOST': JSON.stringify('109.95.32.134'),
            'process.env.PORT': JSON.stringify('3000')
        })
    ],
    optimization: {
        minimizer: [new UglifyJSPlugin({
            parallel: true,
            cache: false,
            sourceMap: true
        })]
    }
});
