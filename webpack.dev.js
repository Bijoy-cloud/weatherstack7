const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool:'eval-cheap-module-source-map',
  devServer:{
    static:{
      directory:path.join(__dirname,'public'),
      
    },
    historyApiFallback:true,
    compress:true,
    port:3000,
   
  }
});