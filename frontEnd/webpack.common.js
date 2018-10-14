const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { exec } = require('child_process');



module.exports = {
    entry: {
        modEl: ['@babel/polyfill', './modElSrc/main.js'],
        admin: ['@babel/polyfill', './adminToolSrc/main.js'],
    },

    output: {
        path: path.resolve('../server/public/bundle'),
        filename: '[name].bundle.js',
    },

    plugins: [
        new CleanWebpackPlugin('../server/public',{
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            template: './modElSrc/model-index.html',
            inject: 'body',
            chunks: ['modEl', 'vendor'],
            filename: 'model-index.html'
        }),
        new HtmlWebpackPlugin({
            template: './adminToolSrc/admin-index.html',
            inject: 'body',
            chunks: ['admin', 'vendor'],
            filename: 'admin-index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('CreateSymlinksAfterBuild', (compilation) => {

                    const script = process.platform === 'win32' ?
                        'createSymLinks.bat' :
                        'node createSymLinks.js';

                    exec(script, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }

                        if (stdout) {
                            console.log(stdout);
                        }

                        if (stderr) {
                            console.log(stderr);
                        }

                    });
                });

            }
        }
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
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
