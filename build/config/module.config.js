 
module.exports = {
    rules:[{
      test: /(\.js)$/,
      use: {
          loader: "babel-loader",
  
      },
      exclude: /node_modules/,
      
  }, {
      test: /\.less$/,
      use: [
          "style-loader",
          "css-loader",
          "less-loader",
      ]
  },],
  }