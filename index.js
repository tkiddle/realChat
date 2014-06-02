//This file contains out server side JS 

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	morgan  = require('morgan'),
	port = 8080,
	activeUsers = [];

	//Set the template directory
	app.set('views', __dirname + '/templates');

	//Tell express we're using Jade
	app.set('view engine', 'jade');

	//Does this augment the app.engine with the jade module?
	app.engine('jade', require('jade').__express)


	//Use the bodyParse method
	app.use(bodyParser());
	
	//Use the cookieParser method
	app.use(cookieParser());

	// Log all requests
	app.use(morgan()); 

	
	var people = [],
		peopleId = {};

	//Routes
	app.get('/', function (request, response) {

		if (false) {

			response.redirect('/chat');

		}

		response.render('join', {title : 'Welcome to RealChat', pageId :  'join', modalPartial: 'modal-join',  modalTitle : 'Choose your desired alias'});
	
	});


	app.all('/chat', function (request, response) {

		if (true) {

			if (request.method === 'POST' && request.body.username !== '') {

				response.render('chat', {title : 'Get chatting!', pageId : 'chat', userList : ['test']});

			} else {

				response.redirect('/');
			}

		} else {			

			response.render('chat', {title : 'Get chatting!', pageId : 'chat', userList : ['test']});

		}
			
	});

	// Tell express where our front end JS is
	app.use(serveStatic(__dirname + '/public'));

	var io = require('socket.io').listen(app.listen(port));

	io.sockets.on('connection', function (socket) {	

		// Join page
		socket.on('join', function (name) {
			
			peopleId[socket.id] = {'name' : name};

			people.push(peopleId[socket.id].name);

			// Not currently in use
			socket.emit('users-update', people);

			socket.user = peopleId[socket.id].name;			


		});

		// Check if user name is being used
		socket.on('user-exist', function (name) {

			var userExists = false;

			if(people.indexOf(name) > -1) {

				userExists = true;

			}

			socket.emit('user-validation', userExists);

		});


		//Chat room send messages
		socket.emit('message', {message : 'Welcome to RandoChat'});
		
		socket.on('send', function (data) {

				io.sockets.emit('message', data);

		});


	});


	console.log(('Listening on port: ' +  port));

