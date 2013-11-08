//This file contains out server side JS 

var express = require('express'),
	app = express(),
	port = 80;

	//Set the template directory
	app.set('views', __dirname + '/templates');

	//Tell express we're using Jade
	app.set('view engine', 'jade');

	//Does this augment the app.engine with the jade module?
	app.engine('jade', require('jade').__express)




	app.get('/', function (request, response) {

		response.render('join', {id :  ''});
	
	});

	app.get('/chat', function (request, response) {

		response.render('chat');
	
	});



	//Tell express where our front end JS is
	app.use(express.static(__dirname + '/public'));

	var io = require('socket.io').listen(app.listen(port));

	io.sockets.on('connection', function (socket) {

		console.log('connected');

		socket.emit('message', {message : 'Welcome to RandoChat'});

		
		socket.on('send', function (data) {

			io.sockets.emit('message', data);

		});

		socket.on('join', function (data) {

			io.sockets.emit('join', data);

		});


	});

	console.warn('Listening on port: ' +  port);

