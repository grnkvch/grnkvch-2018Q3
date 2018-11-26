/* eslint-disable linebreak-style */
let webpack = require('webpack');
let path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/main.js',
  output: {
    filename: 'build.js',
  },
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
    ],
  },
};