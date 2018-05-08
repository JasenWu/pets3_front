
let config = {
  
  mode: 'development',// "production" | "development" | "none"   Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: require('./config/base/entry.config.js'),

  output: require('./config/base/output.config.js'),
  
  resolve: require('./config/base/resolve.config.js'),

  module: require('./config/dev/module.dev.config.js'),

  

  plugins: require('./config/dev/plugins.dev.config.js'),
 
  devServer: require('./config/dev/devServer.config.js'),

  //eslint: require('./config/vendor/eslint.config.js'),

  //postcss: require('./config/vendor/postcss.config.js'),
};


module.exports = config;
