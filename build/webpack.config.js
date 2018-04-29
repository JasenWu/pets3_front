 
let config = {
    mode: 'production',
    
    entry: require('./config/entry.config.js'),
  
    output: require('./config/output.config.js'),
  
    
    module: require('./config/module.config.js'),
  
    //resolve: require('./config/resolve.config.js'),
  
    plugins: require('./config/plugins.dev.config.js'),
  
    //eslint: require('./config/vendor/eslint.config.js'),
  
    //postcss: require('./config/vendor/postcss.config.js'),
  };
 

module.exports = config;
