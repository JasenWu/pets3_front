let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.dev.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    inline:true,
    historyApiFallback: true,
    overlay: {
        warnings: true,
        errors: true
    },
    open: true,
}).listen(8080, '0.0.0.0', function (err, res) {
    if (err) console.log(err);
    console.log('locahost At 8080');
});