
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
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
        })
    }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                "css-loader",
                "less-loader",
            ]
        }) 
    },],
}