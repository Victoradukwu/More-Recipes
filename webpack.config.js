const path = require('path');
const webpack = require('webpack');

const { HotModuleReplacementPlugin } = webpack;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware',
    path.resolve(__dirname, './client/src/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, './client/src/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/

      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true,
    noInfo: true
  }
};
