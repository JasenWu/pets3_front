
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
module.exports = {
    contentBase: path.resolve(__dirname,'../../../dist'),
    open: true,
  }