//To let mocha run es6 code
var webpack = require('webpack')
var path = require('path')

module.exports = {
    context: path.resolve(__dirname),
    entry: './test.js',
    output: {
        path: path.resolve(__dirname, '../gen_wptest'),
        filename: 'test.js'
    },
    module: {
        rules: [{ test: /\.js$/, loader: 'babel-loader' }]
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, '../gen_wptest'),
        compress: true,
        port: 9999
    }
}
