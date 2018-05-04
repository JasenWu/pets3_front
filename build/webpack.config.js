 

let config = {
    mode: 'production',
    
    entry: require('./config/base/entry.config.js'),
  
    output: require('./config/base/output.config.js'),
  
    
    module: require('./config/pro/module.pro.config.js'),
  
    //resolve: require('./config/resolve.config.js'),
  
    plugins: require('./config/pro/plugins.pro.config.js'),
  
    //eslint: require('./config/vendor/eslint.config.js'),
  
    //postcss: require('./config/vendor/postcss.config.js'),
  };

module.exports = config;
