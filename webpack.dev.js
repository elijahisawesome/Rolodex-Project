const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { webpack } =require('webpack');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
    contentBase: './dist',
   },
   plugins:[
    new webpack.EnvironmentPlugin({
      'NodeEnv': 'development'
    }),
  ],
  output: {
    publicPath: '/dist/'
  }

 });