var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

var port = Number(process.env.PORT || 5000);

var server = app.listen(port, function() {
    console.log('Listening on port %d', port);
});
