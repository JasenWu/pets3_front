var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '../../../', dir)
}

console.log('path:',resolve('src/assets'));
module.exports = {
  extensions: ['.js', '.vue', '.json', '.less'],
  alias: {
    '@': resolve('src'),
 
    '@assets': resolve('src/assets'),
    '@models': resolve('src/models'),
    '@config': resolve('src/config'),
    '@views': resolve('src/views'),
    '@components': resolve('src/views/components'),
  }
}