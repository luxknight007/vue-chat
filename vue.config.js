const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    proxy: {
      '/chat': {
        target: 'http://localhost:3005',
        ws: true,
        changeOrigin: true
      },
      '/doc': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/components',
          to: 'components/',
          toType: 'dir'
        }
      ])
    ]
  }
}
