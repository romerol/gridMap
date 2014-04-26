var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
