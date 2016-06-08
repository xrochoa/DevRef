var express = require('express');
var server = new express();
var path = require('path');


server.use(express.static(__dirname + '/dist'));
server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(8000, function() {
    console.log('Serving at http://localhost:8000');
});
