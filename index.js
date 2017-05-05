var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/lib',express.static('./bower_components/jquery/dist'));

app.use(express.static('public'));

app.post('/api/item',function(request,response){
  console.dir(request.body);
  response.json({response:"OK"});
});

app.listen(3000,function(){
  console.log("Serwer dziala na porcie 3000");
});
