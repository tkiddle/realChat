//Join JS - Handeles users joining the chat application

//Define the Join class
REALCHAT.Join = function (usernameInput, joinButton) {

	var self = this;

	self.usernameInput = usernameInput;
	self.joinButton =  joinButton;


	REALCHAT.config.socket.on('join', function (data) {

		console.log(data.user);

	});

	joinButton.addEventListener('submit', function () {

		if (!self.userCheck('username')) {

			self.userSet('username', self.usernameInput.value);

			REALCHAT.config.socket.emit('join', {user : self.usernameInput.value});

		}
	
	});


}


//Augment the Join class prototype pbject
REALCHAT.Join.prototype.userCheck = function (storedUser) {

	if (localStorage.getItem(storedUser) === null) {

		return false;

	}

	return true;

}

REALCHAT.Join.prototype.userSet = function (storedUser, storedUserValue) {

	localStorage.setItem(storedUser, storedUserValue);

}




window.onload = function () {

	var usernameInput = document.getElementById('username'),
		joinButton = document.getElementById('join');


	var chatJoin = new REALCHAT.Join(usernameInput, joinButton);


}




	