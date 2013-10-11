var express = require('express'),
    server = express(),
    port =  (/\d/).test(process.argv[2]) ? process.argv[2] : 8080; //default to 8008, but use the first parameter if it is a number!

server.use('/',express.static(__dirname+"/dist/"));

console.log(process.argv, port);

server.listen(port);
