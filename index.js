//This file contains out server side JS 

var express = require('express'),
	app = express(),
	MongoStore = require('connect-mongo')(express),
	port = 80,
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



	//Tell express where our front end JS is
	app.use(express.static(__dirname + '/public'));

	var io = require('socket.io').listen(app.listen(port));

	io.sockets.on('connection', function (socket) {	

		//Join page

		socket.on('join', function (name) {
			
			peopleId[socket.id] = {'name' : name};

			people.push(name);

			socket.user = name;			

			socket.emit('users-update', people);

		});


		socket.on('user-exist', function (name) {

			var userExists = false;

			if(people.indexOf(name) > -1) {

				userExists = true;

			}

			socket.emit('user-validation', userExists);

		});


		//Chat room
		socket.emit('message', {message : 'Welcome to RandoChat'});
		
		socket.on('send', function (data) {

				console.log(socket.user);

				io.sockets.emit('message', data);

		});


		socket.on('users-update', function (people) {
			socket.emit('render-users', people);
		});	


	});


	console.log(('Listening on port: ' +  port));

