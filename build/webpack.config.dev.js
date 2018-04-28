var webpack = require('webpack');
var path = require('path');
let rules = require('./rules');
 
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),//打包后的目录
        chunkFilename: 'chunk[id].tjs?v=[hash]',
        publicPath: '/dist/',//资源文件的引用路径
        filename: '[name].js'
    },
    module: {
        rules: rules
    },
    resolve: {

    },
    plugins: [


    ]
};