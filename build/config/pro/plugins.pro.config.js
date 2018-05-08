let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin'); //打包前删除文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let path = require('path');

module.exports = [
    new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '../../../'),
        verbose: true,
        dry: false
      }),
    new HtmlWebpackPlugin({
        title:'test',
        filename: 'index.html',
        template:'./src/index.html',
        inject: true
    }),
     
    new ExtractTextPlugin({filename: '[name].css',allChunks: true}),
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img' }]),
    new VueLoaderPlugin(),
   
    
];
