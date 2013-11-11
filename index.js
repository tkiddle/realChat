//This file contains out server side JS 

var express = require('express'),
	app = express(),
	colors = require('colors');
	MongoStore = require('connect-mongo')(express),
	port = 8080,
	activeUsers = [];

	//Set the template directory
	app.set('views', __dirname + '/templates');

	//Tell express we're using Jade
	app.set('view engine', 'jade');

	//Does this augment the app.engine with the jade module?
	app.engine('jade', require('jade').__express)


	//Use the bodyParse method
	app.use(express.bodyParser());
	
	//Use the cookieParser method
	app.use(express.cookieParser());

	
	app.use(express.session({

		secret: 'secretSession',
		cookie: {
			maxAge : 1000000
		},
		store : new MongoStore ({
			db : 'realchatsessionstore'
		})

	}));




	//Routes
	app.get('/', function (request, response) {

		if (request.session.username !== undefined) {

			response.redirect('/chat');

		}

		response.render('join', {title : 'Welcome to RealChat', pageId :  'join'});
	
	});


	app.all('/chat', function (request, response) {

		if (request.session.username == undefined) {


			if (request.method === 'POST' && request.body.username !== '') {

				request.session.username  = request.body.username;

				response.render('chat', {title : 'Get chatting!', pageId : 'chat'});


			} else {

				response.redirect('/');

			}


		} else {

			
			response.render('chat', {title : 'Get chatting!', pageId : 'chat'});

		}
			
	});



	//Tell express where our front end JS is
	app.use(express.static(__dirname + '/public'));

	var io = require('socket.io').listen(app.listen(port));

	io.sockets.on('connection', function (socket) {

		socket.emit('message', {message : 'Welcome to RandoChat'});
		
		socket.on('send', function (data) {

			io.sockets.emit('message', data);

		});

		socket.on('join', function (data) {

			io.sockets.emit('join', data);

		});


		socket.on('userchange', function () {

			io.sockets.emit('userchange', data);

		});


	});



	console.log(('Listening on port: ' +  port).green);

