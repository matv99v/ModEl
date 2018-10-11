const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const makeSymlinks = require('make-symlinks');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    entry: {
        modEl: ['@babel/polyfill', './modElSrc/main.js'],
        admin: ['@babel/polyfill', './adminToolSrc/main.js']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                modElStyles: {
                    name: 'modEl',
                    test: (m,c,entry = 'modEl') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                adminStyles: {
                    name: 'admin',
                    test: (m,c,entry = 'admin') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    output: {
        path: path.resolve('../server/public/bundle'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin('../server/public',{
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        {
            // create symlinks after build
            // ln -s ~/Koding/Projects/assets/html ~/Koding/Projects/ModEl/server/public/
            // mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\html C:\WServ\data\htdocs\assets\html

            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    const sources = ['../../assets/*'];
                    const outputpath = '../server/public/';
                    makeSymlinks(sources, outputpath).then(symlinks => {
                        console.log('Symlinks created');
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
