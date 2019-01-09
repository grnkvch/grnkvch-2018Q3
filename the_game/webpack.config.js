const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    filename: 'build.js',
    path: `${__dirname}/dist`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};
