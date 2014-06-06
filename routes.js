// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.


// Use the gravatar module, to turn email addresses into avatar images:
var gravatar = require('gravatar');

var user;

module.exports = function (app, io) {

	// Home page
	app.get('/', function (req, res) {
		res.render('home');
	});
	
	app.get('/chat', function (req, res) {
		res.render('chat');
	});


	

	// Create a socket namespace called randoChat
	var randoChat = io.of('/randoChat');

	randoChat.on('connection', function (socket) {

		socket.on('join', function (data) {

			socket.uid = socket.client.id
			socket.email = data.email;
			socket.nickname = data.nickname;
			socket.avatar = gravatar.url(data.email, {s: '140', r: 'x', d: 'mm'});

			socket.emit('user-data', {user : {
				uid : socket.uid,
				email : socket.email,
				avatar : socket.avatar,	
				nickname : socket.nickname
			}});

			
			var joinMsg = socket.nickname + ' has joined the conversation.';
			socket.broadcast.emit('publish-message',  {message: joinMsg, uid : socket.uid, nickname: socket.nickname, avatar : socket.avatar, joined : true});
			

		});


		socket.on('new-message', function (data){
			console.log(socket.uid);
			randoChat.emit('publish-message', {message: data, uid : socket.uid, avatar : socket.avatar, nickname: socket.nickname});
		});

		socket.on('disconnect', function() {
			var leavingMsg = socket.nickname + ' has left the conversation.';
			socket.broadcast.emit('publish-message',  {message: leavingMsg, uid : socket.uid, avatar : socket.avatar,nickname: socket.nickname});
		});


	});

}