//This file contains out server side JS 

var express = require('express'),
	app = express(),
	port = 3700;

	//Set the template directory
	app.set('views', __dirname + '/templates');

	//Tell express we're using Jade
	app.set('view engine', 'jade');

	//Does this augment the app.engine with the jade module?
	app.engine('jade', require('jade').__express)


	app.get('/', function (request, response) {

		response.render('page');
	
	});

	//Tell express where our front end JS is
	app.use(express.static(__dirname + '/public'));

	var io = require('socket.io').listen(app.listen(port));

	io.sockets.on('connection', function (socket) {

		socket.emit('message', {'message' : 'Welcome to Real Chat'});

		console.log('connected');


	});

	console.log('Listening on port: ' +  port);

