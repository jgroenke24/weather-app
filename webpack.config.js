var Dotenv = require('dotenv-webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader'] },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'font/' }}]}
    ]
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    public: 'webdevbootcamp-jorge-groenke.c9users.io' // That solved it
  }
}