var webpack = require('webpack')
var path = require("path")
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')
var ip = 'localhost'
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

config.devtool = "#eval-source-map"

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-local.json'}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BASE_API_URL': JSON.stringify('https://'+ ip +':8000'),
  }}),
  new MiniCssExtractPlugin({
    filename: `components/[name]-[hash].css`
  }),
])


config.module = {
  rules: [{ 
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['react-hot-loader/webpack','babel-loader'] 
  }, {
    test: /^((?!\.module).)*css$/,
    // loaders: ['style-loader', 'css-loader'],
    loaders: [{
                 loader: MiniCssExtractPlugin.loader,
               },
              "css-loader"]
  }, {
    test: /\.module.css$/,
    loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
  }]
}

config.entry = {
    App: [
        'webpack-dev-server/client?http://' + ip + ':3000',
        'webpack/hot/only-dev-server',
        './app/App',
    ],
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/'

module.exports = config