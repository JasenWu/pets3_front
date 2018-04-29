let path = require('path');
// webpack 如何输出结果的相关选项
module.exports = {
    path: path.resolve(__dirname, '../../dist'),//打包后的目录   string
    chunkFilename: 'chunk[id].tjs?v=[hash]',
    publicPath: '/',//输出解析文件的目录，url 相对于 HTML 页面  string
    filename: "[name].js",// string  用于多个入口点(entry point)（出口点？）
}