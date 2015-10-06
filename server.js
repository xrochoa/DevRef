var express = require('express');
var compression = require('compression');

var app = express();

// compress all requests
app.use(compression());
//Serve static files = css, js, etc
app.use('/', express.static(__dirname + '/dist'));
//Send to index with any route
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});