
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [{
        test: /(\.js)$/,
        use: {
            loader: "babel-loader",

        },
        exclude: /node_modules/
     

    },  {
      test: /(\.vue)$/,
      exclude: /node_modules/,
      use:[{
        loader: 'vue-loader'
      }
    ]
    },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                'postcss-loader',
                "css-loader",
            ],
        })
    }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                'postcss-loader',
                "less-loader",
            ]
        })
    }, {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8000
                }
            }
        ]
    },],
}
