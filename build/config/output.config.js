let path = require('path');

module.exports = {
    path: path.resolve(__dirname, '../dist'),//打包后的目录
    chunkFilename: 'chunk[id].tjs?v=[hash]',
    publicPath: '/',//资源文件的引用路径
    filename: '[name].js'
}