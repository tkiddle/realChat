//Chat application front end

REALCHAT.Messaging = function (messagesArray, dialogueBox, messageInput, messageSubmit) {

	var self = this;
	
	self.messagesArray = messagesArray,
	self.dialogueBox = dialogueBox,
	self.messageInput = messageInput,
	self.messageSubmit = messageSubmit;

	
	REALCHAT.config.socket.on('message', function (data) {
			
		console.log('Single Message: ' , data.message);

		if (data.message) {

			var messageList = '';

			self.messagesArray.push(data.message);

			for (var i = 0; i < self.messagesArray.length; i++) {
				messageList += self.messagesArray[i] + '<br />'
			}

			self.dialogueBox.innerHTML = messageList;

		}		
		

	});
	

	self.messageSubmit.onclick = function () {

		var messageValue = self.messageInput.value;
		
		REALCHAT.config.socket.emit('send', {message : messageValue});

	}


	REALCHAT.config.socket.on('update-user-list', function (data) {

		$.each(data.people, function(i, obj) {
       		$('#users').append("<li class=\"list-group-item\">" + obj.name + "</li>");   
       		console.log(obj.name);
      	});


	});


}




window.onload = function () {

	var messages = [],
		chatBox = document.getElementById('chat-box'),
		messageInput = document.getElementById('message'),
		sendButton = document.getElementById('send');
		

	var chatMessaging = new REALCHAT.Messaging(messages, chatBox, messageInput, sendButton);
		

}