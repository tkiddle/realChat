//Chat application front end

REALCHAT.Messaging = function (messagesArray, dialogueBox, messageInput, messageSubmit) {

	var self = this;
	
	self.messagesArray = messagesArray,
	self.dialogueBox = dialogueBox,
	self.messageInput = messageInput,
	self.messageSubmit = messageSubmit;

	
	REALCHAT.config.socket.on('message', function (data) {
			
		if (data.message) {

			var messageList = '';

			self.messagesArray.push(data);
			
			for (var i = 0; i < self.messagesArray.length; i++) {
				messageList += self.messagesArray[i].username + ': ' + self.messagesArray[i].message + '<br />'
			}

			self.dialogueBox.innerHTML = (messageList);

		}		
		

	});
	

	self.messageSubmit.onclick = function () {

		var messageValue = self.messageInput.value,
			currentUser = localStorage.getItem('username');
		
		REALCHAT.config.socket.emit('send', {message : messageValue, username : currentUser});

	}


}




window.onload = function () {

	var messages = [],
		chatBox = document.getElementById('chat-box'),
		messageInput = document.getElementById('message'),
		sendButton = document.getElementById('send');
		

	var chatMessaging = new REALCHAT.Messaging(messages, chatBox, messageInput, sendButton);
		

}