let HtmlWebpackPlugin = require('html-webpack-plugin');
 

module.exports = [new HtmlWebpackPlugin({
    title:'test',
    filename: 'index.html',
    template:'./src/index.html',
    inject: true
}), ];