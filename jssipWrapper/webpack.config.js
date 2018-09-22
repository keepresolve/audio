const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack') //to access built-in plugins
const path = require('path')

//https://github.com/webpack/webpack-dev-server/issues/1422
//webpack-dev-server 目前只能用"webpack-cli"不能用"webpack-command"

module.exports = {
    //entry: './src/ui/index.js',
    entry: {
        index: [
            './src/ui/index.js',
            './resources/css/phone.scss',
            './favicon.ico'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                        // options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: 'styles'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(ico|gif|png|jpe?g|svg)$/i,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebPackPlugin({
            template: 'resources/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // chunkFilename: "[id].css"
            publicPath: path.resolve(__dirname, './dist')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    },
    devtool: 'source-map'
}
