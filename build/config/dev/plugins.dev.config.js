let HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
 

module.exports = [new HtmlWebpackPlugin({
    title:'test',
    filename: 'index.html',
    template:'./src/index.html',
    inject: true
}),new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }])];