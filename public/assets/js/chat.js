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
				messageList += '<b>' + (self.messagesArray[i].username ? self.messagesArray[i].username : 'Server') + ': </b>' +  self.messagesArray[i].message + '<br />'
			}

			self.dialogueBox.innerHTML = (messageList);

		}		
		

	});


	self.messageSubmit.onclick = function () {
		self.emitMessage(self.messageInput);
		self.messageInput.value = '';
	}

	self.messageInput.addEventListener('keydown', MessageTextOnKeyEnter);



	function MessageTextOnKeyEnter(e) {
	    if (e.keyCode == 13) {
	        if (e.ctrlKey) {
	            var val = this.value;
	            if (typeof this.selectionStart == "number" && typeof this.selectionEnd == "number") {
	                var start = this.selectionStart;
	                this.value = val.slice(0, start) + "\n" + val.slice(this.selectionEnd);
	                this.selectionStart = this.selectionEnd = start + 1;
	                
	                self.emitMessage(self.messageInput);
	                self.messageInput.value = '';


	            } else if (document.selection && document.selection.createRange) {
	                this.focus();
	                var range = document.selection.createRange();
	                range.text = "\r\n";
	                range.collapse(false);
	                range.select();

	                self.emitMessage(self.messageInput);
	                self.messageInput.value = '';

	            }
	        }
	        return false;
	    }
	}



}


REALCHAT.Messaging.prototype.emitMessage  = function (messageValue) {

	var messageValue = messageValue.value,
		currentUser = localStorage.getItem('username');
		
		REALCHAT.config.socket.emit('send', {message : messageValue, username : currentUser});

}


window.onload = function () {

	var messages = [],
		chatBox = document.getElementById('chat-box'),
		messageInput = document.getElementById('message'),
		sendButton = document.getElementById('send');
		

	var chatMessaging = new REALCHAT.Messaging(messages, chatBox, messageInput, sendButton);
		

}