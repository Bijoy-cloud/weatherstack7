var path = require('path');
var express = require('express');
const publicPath = path.join(__dirname,'..','public')
var app = express();

app.use(express.static(publicPath));// it is used to serve static files
app.get('*',(req,res)=>{
  res.sendFile(path.join(publicPath,'index.html'))
})
app.set('port', process.env.PORT || 8080);// we set port as  process.env.Port it's like a variable

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});