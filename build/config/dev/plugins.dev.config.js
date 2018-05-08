let HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = [new ErrorOverlayPlugin(),new HtmlWebpackPlugin({
    title:'test',
    filename: 'index.html',
    template:'./src/index.html',
    inject: true
}),new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
new VueLoaderPlugin()
];
