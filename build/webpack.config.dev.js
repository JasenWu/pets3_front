
let config = {
    mode: 'development',// "production" | "development" | "none"   Chosen mode tells webpack to use its built-in optimizations accordingly.
    
    entry: require('./config/entry.config.js'),
  
    output: require('./config/output.config.js'),
  
    module: require('./config/module.dev.config.js'),
  
    //resolve: require('./config/resolve.config.js'),
  
    plugins: require('./config/plugins.dev.config.js'),
  
    //eslint: require('./config/vendor/eslint.config.js'),
  
    //postcss: require('./config/vendor/postcss.config.js'),
  };


module.exports = config;
