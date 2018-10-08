const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const exec = require('child_process').exec;

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

// function getSymlinkShellScripts() {
//     return [
//         'goods-photos',
//         'Manuals',
//         'html'
//     ].map(folder => `mklink /D C:\\WServ\\data\\htdocs\\ModEl\\server\\public\\${folder} C:\\WServ\\data\\htdocs\\assets\\${folder}`);
// }


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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        {
            // chmod +x ./postbuildscript.sh
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('./postbuildscript.sh', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
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
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader', // creates style nodes from JS strings
            //         'css-loader', // translates CSS into CommonJS
            //         'sass-loader' // compiles Sass to CSS
            //     ]
            // },
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' }
            //     ]
            // },
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
