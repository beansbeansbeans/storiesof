var http = require('http');

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/build'));

var server = http.createServer(app);

server.listen(5000);
console.log("listening on port 5000");
