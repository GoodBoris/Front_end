var path = require('path'),
    libPath = path.join(__dirname, 'src'),
    pkg = require('../package.json'),
    webpack = require("webpack"),
    extend = require('util')._extend,
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpackConfig = require('./webpack.config.js');
    prototype = require('./webpack/factory.js');    
module.exports = extend(webpackConfig, {
    plugins: [
        new prototype.plugin.translation({
            languages: ['en'],
            output: 'locales'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(libPath, 'index.html')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
});
