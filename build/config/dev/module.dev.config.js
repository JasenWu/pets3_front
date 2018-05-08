const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  rules: [
    //   {
    //   enforce: "pre",
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: "eslint-loader",
    // }, 
    {
      test: /(\.js)$/,
      exclude: /node_modules/,
      use:[{
          loader: 'babel-loader'
          
        }
        
      ]
     
    }, {
      test: /(\.vue)$/,
      exclude: /node_modules/,
      use:[{
        loader: 'vue-loader',
        options: {
          hotReload: true // disables Hot Reload
        }
      }
    ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },  {
      test: /\.less$/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: { modules: true,
            localIdentName: '[local]'
          }
        },
        'postcss-loader',
        'less-loader'
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
    }]
}
