const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { EnvironmentPlugin } =require('webpack');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
    contentBase: './dist',
   },
   plugins:[
    new EnvironmentPlugin({
      'NodeEnv': 'development'
    }),
  ],
  output: {
    publicPath: '/dist/'
  }

 });