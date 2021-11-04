

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
  mode: 'production',
  devtool:'source-map'
  // ,
  // 'plugins': [
  //   new LodashModuleReplacementPlugin,
  //   new BundleAnalyzerPlugin(),
   

  // ],
  

    
});