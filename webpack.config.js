// importing dependencies
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, './client/src/index.js'),
  output: {
    path: path.resolve(__dirname, ',/client/build'),
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
