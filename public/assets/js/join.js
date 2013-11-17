//Join JS - Handeles users joining the chat application

//Define the Join class
REALCHAT.Join = function (usernameInput, joinButton) {

	var self = this;

	self.usernameInput = usernameInput;
	self.joinButton =  joinButton;


	

	self.joinButton.addEventListener('click', function () {

	
		self.userExist(self.usernameInput.value);

		REALCHAT.config.socket.on('user-validation', function (userExists) {	
		
			if (!userExists) {

				REALCHAT.config.socket.emit('join', self.usernameInput.value);

				if(!self.userCheck(self.usernameInput.value)) {
					
					self.userSet('username', self.usernameInput.value);
				
				}

				$('#username-select').submit();

			}	else {

				alert ('This username is already in use. Please choose another!');

				return false
				
			}

		});
		

	});


}

//Augment the Join class prototype object

REALCHAT.Join.prototype.userExist = function (usernameValue) {

	REALCHAT.config.socket.emit('user-exist', usernameValue);

}

REALCHAT.Join.prototype.userCheck = function (storedUser) {

	if (localStorage.getItem(storedUser) === null) {

		return false;
	}

	return true;

}

REALCHAT.Join.prototype.userSet = function (storedUser, storedUserValue) {

	localStorage.setItem(storedUser, storedUserValue);

}




//initialise the app on load.
window.onload = function () {

	var usernameInput = document.getElementById('username'),
		joinButton = document.getElementById('join');


	var chatJoin = new REALCHAT.Join(usernameInput, joinButton);


}




	