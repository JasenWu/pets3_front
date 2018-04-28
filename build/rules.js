module.exports = [{
    test: /(\.js)$/,
    use: {
        loader: "babel-loader",

    },
    exclude: /node_modules/
}, {
    test: /\.less$/,
    use: [
        "style-loader",
        "css-loader",
        "less-loader",
    ]
}, {
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader?limit=8192&name=assets/img/[name].[hash:8].[ext]'
    }],
},]