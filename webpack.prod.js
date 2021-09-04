const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { argv } = require('process');

 module.exports = merge(common, {
   mode: 'production',
 });