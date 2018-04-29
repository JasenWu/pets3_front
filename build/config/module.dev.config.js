
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [{
        test: /(\.js)$/,
        use: {
            loader: "babel-loader",

        },
        exclude: /node_modules/,

    }, {
        test: /\.css$/,
        use: [
            
            "style-loader",
            "css-loader",
        ]
    }, {
        test: /\.less$/,
        use: [
            "style-loader",
            "css-loader",
            "less-loader",
        ] 
    },],
}