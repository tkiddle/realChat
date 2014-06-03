//This file contains out server side JS 

var express = require('express'),
	app = express();

// Set the port variable if no port
var port = process.env.PORT || 8080;

// Require socket.io and pass in port number
var io = require('socket.io').listen(app.listen(port));

// Require config & routes 
require('./config')(app, io);
require('./routes')(app, io);

// Log message to server
console.log('Your application is running on http://localhost:' + port);

