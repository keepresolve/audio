const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack'); //to access built-in plugins
const path = require("path");

//https://github.com/webpack/webpack-dev-server/issues/1422
//webpack-dev-server 目前只能用"webpack-cli"不能用"webpack-command"

module.exports = {
    entry: './src/ui/script.js',
    output:{
        path: path.resolve(__dirname, './dist-wp'),
        filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: 'styles'
              }
            },
            'css-loader'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader"
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebPackPlugin({
        template: "resources/index.html",
        filename: "index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        // chunkFilename: "[id].css"
        publicPath:path.resolve(__dirname, './dist-wp'),
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, './dist-wp'),
      compress: true,
      port: 9000
    }
  };