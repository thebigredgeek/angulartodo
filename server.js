var express = require('express'),
    server = express();

server.use('/',express.static(__dirname+"/dist/"));

server.listen(8080);
