const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');




module.exports = {
    entry: {
        modEl: ['@babel/polyfill', './modElSrc/main.js'],
        admin: ['@babel/polyfill', './adminToolSrc/main.js']
    },

    output: {
        path: path.resolve('../server/public/bundle'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin('../server/public/bundle',{
            allowExternal: true
        }),

        new HtmlWebpackPlugin({
            template: './modElSrc/model-index.html',
            inject: 'body',
            chunks: ['modEl'],
            filename: 'model-index.html'
        }),

        new HtmlWebpackPlugin({
            template: './adminToolSrc/admin-index.html',
            inject: 'body',
            chunks: ['admin'],
            filename: 'admin-index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=15000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=15000&mimetype=image/svg+xml'
            }

        ]
    },



    resolve: {
        alias: {
            AliasModelSrc: path.resolve(__dirname, 'modElSrc'),
            AliasAdminToolSrc: path.resolve(__dirname, 'adminToolSrc'),
            AliasApi: path.resolve(__dirname, 'api'),
            AliasRoot: path.resolve(__dirname, './'),
        }
    },

};
