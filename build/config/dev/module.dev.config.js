
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    rules: [{
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
    }, {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
    }, {
        test: /\.css$/,
        use: [
            "style-loader",
            "postcss-loader",
           
            "css-loader",
        ]
    }, {
        test: /\.less$/,
       
        use: [
           
            "style-loader",
            
            "css-loader",
            'postcss-loader' ,
            "less-loader",
        ]
    }, {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },],
}
