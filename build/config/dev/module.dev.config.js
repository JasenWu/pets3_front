
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    rules: [{
        test: /\.(js | vue |jsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: 'pre'
    }, {
        test: /(\.js)$/,
        use: {
            loader: "babel-loader",

        },
        exclude: /node_modules/
      

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