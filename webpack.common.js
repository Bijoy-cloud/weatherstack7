//entry->output
const path = require('path')

module.exports = {
    entry:'./src/App.js',
   
    output: {
      path:path.join(__dirname,'public'),
      filename:'bundle.js'  
    },
    module:{
     
      rules:[{
        loader:'babel-loader',
        test:/\.js$/,
        exclude:/node_modules/,
        
        
      },
      {
        test: /\.html$/, // tells webpack to use this loader for all ".html" files
        loader: 'html-loader'
    },
      {
        test:/\.(png|jpg)/,
        loader:'file-loader'
      },
      { 
        test: /\.css$/i, 
        use: ["style-loader", "css-loader"]
      },
      { loader: 'scoped-css-loader' },
      ]
    }

 
   

}