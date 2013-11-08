//Chat application front end

window.onload = function () {

	var messages = [],
		socket = io.connect('http://localhost'),
		chatBox = document.getElementById('chat-box'),
		messageInput = document.getElementById('message'),
		usernameInput = document.getElementById('username'),
		sendButton = document.getElementById('send'),
		joinButton = document.getElementById('join');

		socket.on('message', function (data) {
			
			console.log('Single Message: ' , data.message);

			if (data.message) {

				var messageList = '';

				messages.push(data.message);

				for (var i = 0; i < messages.length; i++) {
					messageList += messages[i] + '<br />'
				}

				chatBox.innerHTML = messageList;

			}		
			

		});


		socket.on('join', function (data) {

			console.log(data.user);

		});

		sendButton.onclick = function () {

			var messageValue = messageInput.value;
			
			socket.emit('send', {message : messageValue});

		}

		joinButton.onclick = function () {

			var usernameValue = usernameInput.value;
			alert('usernameValue');

			socket.emit('join', {user : usernameValue});


		}

alert(2);

}