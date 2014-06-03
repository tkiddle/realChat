// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.


// Use the gravatar module, to turn email addresses into avatar images:
var gravatar = require('gravatar');

var people = [],
	activeUsers = [],
	peopleId = {};

module.exports = function (app, io) {
	
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

}