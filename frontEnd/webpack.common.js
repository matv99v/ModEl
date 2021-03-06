const path = require('path');
const exec = require('child_process').exec;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');


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
        new CleanWebpackPlugin('../server/public', {
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
        new UnusedFilesWebpackPlugin({
            globOptions: {
                ignore: [
                    'node_modules/**/*',
                    'templates/**/*',
                    '*.*', // all files in root folder
                    '**/OFL.txt',
                    '**/*.test.js',
                ]
            }
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('node ./generateSymlinkScript.js', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        },
    ],

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
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
        },

        extensions: ['.js', '.jsx']
    },

};
