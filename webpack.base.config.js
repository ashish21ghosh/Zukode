var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App: './app/App',
    vendors: ['react'],
  },

  output: {
      path: path.resolve('./zukode/static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  // externals: [
  // ],
  // add all vendor libs

  plugins: [
    // new webpack.optimize.splitChunks('vendors', 'vendors.js'),
  ], // add all common plugins here

  mode: 'development',

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  },
}