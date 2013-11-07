//Chat application front end

window.onload = function () {

	var messages = [],
		socket = io.connect('http//localhost:3700'),
		chatBox = document.getElementById('chat-box'),
		messageInput = document.getElementById('message'),
		usernameInput = document.getElementById('username'),
		sendButton = document.getElementById('send'),
		sendButton = document.getElementById('join');

		socket.on('message', function (data) {
			alert(1);
		});
alert(2);

}