// Require the gravatar module
var gravatar = require('gravatar');

module.exports = function (app, io) {

	// Home page
	app.get('/', function (req, res) {
		res.render('chat');
	});

	// Namespace our sockets
	var randoChat = io.of('/randoChat');

	randoChat.on('connection', function (socket) {

		// When a user joins
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
			socket.broadcast.emit('publish-message',  {message: joinMsg, uid : socket.uid, nickname: socket.nickname, avatar : socket.avatar, action : true});
			

		});

		// When a user sends a message
		socket.on('new-message', function (data){

			randoChat.emit('publish-message', {message: data, uid : socket.uid, avatar : socket.avatar, nickname: socket.nickname});
		
		});


		// When a user leaves the chat
		socket.on('disconnect', function() {
			
			if (socket.nickname) {
				
				var leavingMsg = socket.nickname + ' has left the conversation.';
				socket.broadcast.emit('publish-message',  {message: leavingMsg, uid : socket.uid, avatar : socket.avatar,nickname: socket.nickname, action : true});
			
			}

		});

	});

}