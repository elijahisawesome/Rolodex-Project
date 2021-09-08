const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { EnvironmentPlugin } =require('webpack');


 module.exports = merge(common, {
   mode: 'production',
   plugins:[
    new EnvironmentPlugin({
      NodeENV:'production',
    }),
   ]
 });