const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.HOST': JSON.stringify(
                '109.95.32.134'
                // 'localhost'
            ),
            'process.env.PORT': JSON.stringify('3001'),
        })
    ]

});
